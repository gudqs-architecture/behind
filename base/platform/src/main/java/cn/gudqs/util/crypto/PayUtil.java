package cn.gudqs.util.crypto;

import cn.gudqs.exception.CustomException;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.logging.log4j.util.Strings;

import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * @author wq
 */
public class PayUtil {

    /**
     * 签名字符串
     *
     * @param text         需要签名的字符串
     * @param key          密钥
     * @param inputCharset 编码格式
     * @return 签名结果
     */
    public static String sign(String text, String key, String inputCharset) {
        text = text + key;
        return DigestUtils.md5Hex(getContentBytes(text, inputCharset))
                .toUpperCase();
    }

    /**
     * 签名字符串
     *
     * @param text          需要签名的字符串
     * @param sign          签名结果
     * @param key           密钥
     * @param inputCharset 编码格式
     * @return 签名结果
     */
    public static boolean verify(String text, String sign, String key,
                                 String inputCharset) {
        text = text + key;
        String md5Hex = DigestUtils
                .md5Hex(getContentBytes(text, inputCharset));
        return md5Hex.equals(sign);
    }

    private static byte[] getContentBytes(String content, String charset) {
        if (charset == null || "".equals(charset)) {
            return content.getBytes();
        }
        try {
            return content.getBytes(charset);
        } catch (UnsupportedEncodingException e) {
            throw new CustomException("MD5签名过程中出现错误,指定的编码集不对,您目前指定的编码集是:" + charset);
        }
    }

    private static boolean isValidChar(char ch) {
        return (ch >= '0' && ch <= '9') || (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z') || (ch >= 0x4e00 && ch <= 0x7fff) || (ch >= 0x8000 && ch <= 0x952f);
    }

    /**
     * 除去数组中的空值和签名参数
     *
     * @param sArray 签名参数组
     * @return 去掉空值与签名参数后的新签名参数组
     */
    public static Map<String, String> paraFilter(Map<String, String> sArray) {
        Map<String, String> result = new HashMap<>(10);
        if (sArray == null || sArray.size() <= 0) {
            return result;
        }
        for (String key : sArray.keySet()) {
            String value = sArray.get(key);
            if (value == null || "".equals(value)
                    || "sign".equalsIgnoreCase(key)
                    || "sign_type".equalsIgnoreCase(key)) {
                continue;
            }
            result.put(key, value);
        }
        return result;
    }

    /**
     * 把数组所有元素排序，并按照“参数=参数值”的模式用“&”字符拼接成字符串
     *
     * @param params 需要排序并参与字符拼接的参数组
     * @return 拼接后字符串
     */
    public static String createLinkString(Map<String, String> params) {
        List<String> keys = new ArrayList<String>(params.keySet());
        Collections.sort(keys);
        System.out.println("keys:" + keys);
        StringBuilder urlParamSbf = new StringBuilder();
        for (int i = 0; i < keys.size(); i++) {
            String key = keys.get(i);
            String value = params.get(key);
            if (i == keys.size() - 1) {
                urlParamSbf.append(key).append("=").append(value);
            } else {
                urlParamSbf.append(key).append("=").append(value).append("&");
            }
        }
        return urlParamSbf.toString();
    }

    public static String urlEncodeUTF8(String source) {
        String result = source;
        try {
            result = java.net.URLEncoder.encode(source, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new CustomException("url encoding error!");
        }
        return result;
    }

    public static String sign(Map<String, String> params, String appSecret) {
        StringBuilder sign = new StringBuilder(appSecret);
        for (Map.Entry entry : params.entrySet()) {
            String name = (String) entry.getKey();
            String value = (String) entry.getValue();

            if (!Strings.isEmpty(name) && !Strings.isEmpty(value)) {
                sign.append(name).append(value);
            }
        }
        sign.append(appSecret);
        return DigestUtils.md5Hex(getContentBytes(sign.toString(), "utf-8")).toUpperCase();

    }

    public static String getSignBody(Map<String, String> sParaTemp, String payKey) {
        Map<String, String> sPara = PayUtil.paraFilter(sParaTemp);
        String linkString = PayUtil.createLinkString(sPara);
        String key = "&key=" + payKey;
        String mySign = PayUtil.sign(linkString, key, "utf-8").toUpperCase();
        sParaTemp.put("sign", mySign);
        return MessageUtil.messageToXML(sParaTemp);
    }
}