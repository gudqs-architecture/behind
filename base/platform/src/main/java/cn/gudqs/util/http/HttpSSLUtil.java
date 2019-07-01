package cn.gudqs.util.http;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.apache.http.util.EntityUtils;

import javax.net.ssl.SSLContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.KeyStore;

/**
 * @author wq
 */
public class HttpSSLUtil {

    public static String sslPost(String url, String body, String certificatePath, String password) throws Exception {
        String result = "";

        KeyStore keyStore = KeyStore.getInstance("PKCS12");

        FileInputStream inputStream = new FileInputStream(new File(certificatePath));
        try {
            keyStore.load(inputStream, password.toCharArray());
        } finally {
            inputStream.close();
        }
        SSLContext sslContext = SSLContexts.custom().loadKeyMaterial(keyStore, password.toCharArray()).build();


        SSLConnectionSocketFactory sslConnectionSocketFactory = new SSLConnectionSocketFactory(sslContext, new String[]{"TLSv1"}, null,
                SSLConnectionSocketFactory.getDefaultHostnameVerifier());


        CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(sslConnectionSocketFactory).build();
        try {
            HttpPost httpPost = new HttpPost(url);
            StringEntity reqEntity = new StringEntity(body, "UTF-8");
            httpPost.setEntity(reqEntity);
            System.out.println("Executing request " + httpPost.getRequestLine());
            CloseableHttpResponse response = null;
            try {
                response = httpClient.execute(httpPost);
                result = EntityUtils.toString(response.getEntity(), "UTF-8");
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("请求失败");
                throw new RuntimeException(e);
            } finally {
                try {
                    if (response != null) {
                        response.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("请求失败");
            throw new RuntimeException(e);
        } finally {
            try {
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return result;
    }
}
