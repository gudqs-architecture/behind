package cn.gudqs.util.http;

import cn.gudqs.exception.CustomException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.io.IOUtils;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpMessage;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.cookie.Cookie;
import org.apache.http.cookie.CookieOrigin;
import org.apache.http.cookie.CookieSpec;
import org.apache.http.cookie.CookieSpecProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.cookie.DefaultCookieSpec;
import org.apache.http.impl.cookie.DefaultCookieSpecProvider;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.util.Strings;
import org.jboss.logging.Logger;

import javax.net.ssl.SSLContext;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.zip.GZIPInputStream;

/**
 * @author wq
 */
public class HttpUtils {

    private static Logger logger = Logger.getLogger(HttpUtils.class);

    private static CloseableHttpClient httpClient;

    private static RequestConfig requestConfig;

    static {
        System.setProperty("jsse.enableSNIExtension", "false");
        CookieSpecProvider easySpecProvider = new CookieSpecProvider() {
            @Override
            public CookieSpec create(HttpContext context) {
                return new DefaultCookieSpec() {

                    @Override
                    public void validate(Cookie cookie, CookieOrigin origin) {
                        // Oh, I am easy
                    }
                };
            }

        };
        Registry<CookieSpecProvider> reg = RegistryBuilder.<CookieSpecProvider>create()
                .register(CookieSpecs.DEFAULT, new DefaultCookieSpecProvider())
                .register(CookieSpecs.DEFAULT, new DefaultCookieSpecProvider())
                .register("mySpec", easySpecProvider).build();

        TrustStrategy acceptingTrustStrategy = new TrustSelfSignedStrategy();
        try {
            SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom().loadTrustMaterial(null, acceptingTrustStrategy)
                    .build();
            SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext, NoopHostnameVerifier.INSTANCE);
            requestConfig = RequestConfig.custom().setCookieSpec("mySpec").build();
            httpClient = HttpClients.custom().setDefaultCookieSpecRegistry(reg)
                    .setSSLSocketFactory(csf)
                    .setDefaultRequestConfig(requestConfig)
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static String httpClientPost(String url, Map<String, String> heads, Map<String, String> params) throws IOException {
        return httpClientPost(url, heads, params, null);
    }

    public static String httpClientPost(String url, Map<String, String> heads, HttpEntity entity) throws IOException {
        return httpClientPost(url, heads, entity, null);
    }

    public static String httpClientPost(String url, Map<String, String> heads, HttpEntity entity, RequestConfig requestConfig0) throws IOException {
        String resp;
        CloseableHttpResponse response = null;
        HttpPost post = null;
        try {
            post = new HttpPost(url);
            if (requestConfig0 != null) {
                post.setConfig(requestConfig0);
            } else {
                post.setConfig(requestConfig);
            }

            setHeaders(heads, post);
            post.setEntity(entity);
            response = httpClient.execute(post);
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode != HttpStatus.SC_OK) {
                logger.error("http client--> post failed: " + response.getStatusLine());
                throw new CustomException(response.getStatusLine().toString());
            } else {
                resp = EntityUtils.toString(response.getEntity(), Consts.UTF_8);
            }

        } catch (IOException e) {
            throw new CustomException("http client--> post exception: " + e.getMessage(), 500);
        } finally {
            if (response != null) {
                response.close();
            }
            if (post != null) {
                post.releaseConnection();
            }
        }
        return resp;
    }

    public static String httpClientPost(String url, Map<String, String> heads, Map<String, String> params, RequestConfig requestConfig0) throws IOException {
        List<NameValuePair> valuePairs = new ArrayList<NameValuePair>();
        // 设置请求参数
        if (params != null) {
            Set<String> paramsKeys = params.keySet();
            for (String key : paramsKeys) {
                String value = params.get(key);
                NameValuePair param = new BasicNameValuePair(key, value);
                valuePairs.add(param);
            }
        }
        UrlEncodedFormEntity entity = new UrlEncodedFormEntity(valuePairs, Consts.UTF_8);
        return httpClientPost(url, heads, entity, requestConfig0);
    }

    /**
     * 使用 http client 发起一个 get 请求
     *
     * @param url    url
     * @param params 请求参数
     * @return 结果
     * @throws IOException e
     */
    public static String httpClientGet(String url, String params) throws IOException {
        return httpClientGet(url, null, params);
    }

    /**
     * 使用 http client 发起一个 get 请求
     *
     * @param url   url
     * @param heads 请求头
     * @return 结果
     * @throws IOException e
     */
    public static String httpClientGet(String url, Map<String, String> heads) throws IOException {
        return httpClientGet(url, heads, null);
    }

    public static String httpClientGet(String url, Map<String, String> heads, String params) {
        return httpClientGet(url, heads, params, null);
    }

    public static String httpClientGet(String url, Map<String, String> heads, String params, RequestConfig requestConfig0) {
        String resp = "";
        CloseableHttpResponse response = null;
        try {
            if (!Strings.isBlank(params)) {
                url = url + "?" + params;
            }
            logger.debug("http client--> get: " + url);
            HttpGet get = new HttpGet(url);
            if (requestConfig0 != null) {
                get.setConfig(requestConfig0);
            } else {
                get.setConfig(requestConfig);
            }

            setHeaders(heads, get);

            response = httpClient.execute(get);
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode != HttpStatus.SC_OK) {
                logger.error("http client--> get failed: " + response.getStatusLine());
                throw new CustomException(response.getStatusLine().toString());
            } else {
                resp = EntityUtils.toString(response.getEntity(), Consts.UTF_8);
            }
        } catch (IOException e) {
            throw new CustomException("http client--> get exception: " + e.getMessage(), 500);
        }
        return resp;
    }

    /**
     * 使用 http client 下载一个图片
     *
     * @param url url
     * @return 结果
     * @throws IOException e
     */
    public static InputStream getImg(String url) throws IOException {
        CloseableHttpResponse response;
        try {
            HttpGet get = new HttpGet(url);
            logger.info("http client--> getImg: " + url);
            get.setConfig(requestConfig);

            response = httpClient.execute(get);
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode != HttpStatus.SC_OK) {
                logger.error("http client--> getImg failed: " + response.getStatusLine());
                return null;
            } else {
                logger.info("http client--> getImg: " + url + " Result: " + response.getEntity().getContentLength());
                return response.getEntity().getContent();
            }
        } catch (IOException e) {
            throw new CustomException("http client--> getImg exception: " + e.getMessage(), 500);
        }
    }

    private static void setHeaders(Map<String, String> heads, HttpMessage httpBase) {
        if (heads != null) {
            Set<String> keys = heads.keySet();
            for (String key : keys) {
                String value = heads.get(key);
                httpBase.setHeader(key, value);
            }
        }
    }

    /**
     * 使用 url connection 爬取页面数据并返回
     *
     * @param url    url
     * @param params 参数
     * @return 页面数据
     * @throws Exception e
     */
    @SuppressWarnings("AlibabaUndefineMagicConstant")
    public static String getPage(String url, String params) throws Exception {
        if (!Strings.isBlank(params)) {
            url = url + "?" + params;
        }
        URL realUrl = new URL(url);
        HttpURLConnection conn = (HttpURLConnection) realUrl.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Connection", "close");
        conn.setConnectTimeout(20000);
        conn.setReadTimeout(20000);
        conn.setRequestProperty("Accept-Encoding", "gzip,deflate");
        conn.setRequestProperty("Accept-Charset", "utf-8");
        conn.setRequestProperty("Content-Type", "text/html; charset=utf-8");

        String result;
        try {
            logger.info("http client--> getPage: " + url);
            conn.connect();
            String sourceType = conn.getContentEncoding();
            logger.info("file type: " + sourceType);
            int code = conn.getResponseCode();
            String encodeType = conn.getContentType();
            logger.info("file encoding: " + encodeType);
            encodeType = encodeType.toUpperCase();
            String charSet = "";
            if (encodeType.contains("UTF-8")) {
                charSet = "UTF-8";
            } else if (encodeType.contains("GBK")) {
                charSet = "GBK";
            } else if (encodeType.contains("GB2312")) {
                charSet = "GB2312";
            } else {
                charSet = "UTF-8";
            }
            if (code == 200 && "gzip".equals(sourceType)) {
                InputStream inStream = new GZIPInputStream(conn.getInputStream());
                result = IOUtils.toString(inStream, charSet);
            } else {
                InputStream inStream = conn.getInputStream();
                result = IOUtils.toString(inStream, charSet);
            }
            conn.disconnect();
        } catch (Exception e) {
            throw new CustomException("http client--> getPage exception: " + e.getMessage(), 500);
        }
        logger.info("http client--> getPage: " + url + "?" + params + " Result: " + result.length());
        return result;
    }

    /**
     * 类似于 ajax post jsonStr 的方式, 直接将 str 写入服务端, 较底层的 http 协议使用方式
     * @param requestUrl url
     * @param requestMethod method
     * @param outputStr str
     * @return 结果
     * @throws IOException e
     */
    public static String httpRequest(String requestUrl, String requestMethod, String outputStr) throws IOException {//
        byte[] bytes = httpRequest0(requestUrl, requestMethod, outputStr);
        return new String(bytes, Consts.UTF_8);
    }

    public static byte[] httpRequest0(String requestUrl, String requestMethod, String outputStr) throws IOException {
        HttpURLConnection conn = null;
        OutputStream os = null;
        try {
            logger.debug("http client--> httpRequest: " + requestUrl + " : " + requestMethod);
            URL url = new URL(requestUrl);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod(requestMethod);
            conn.setConnectTimeout(20000);
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setUseCaches(false);
            conn.connect();
            // 往服务器端写内容
            if (null != outputStr) {
                os = conn.getOutputStream();
                os.write(outputStr.getBytes(Consts.UTF_8));
                os.flush();
                os.close();
            }
            InputStream inputStream = conn.getInputStream();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] bytes = new byte[4096];
            int len;
            while ((len = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, len);
            }
            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new CustomException("http client--> httpRequest exception: " + e.getMessage());
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
            if (os != null) {
                os.close();
            }
        }
    }

}
