package cn.gudqs.util.crypto;

import cn.gudqs.exception.CustomException;
import org.jboss.logging.Logger;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.Mac;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.util.Arrays;
import java.util.Date;

/**
 * @author wq
 * @date 2018/9/20
 * @description seo1
 */
public class CryptoUtils {

    private static final String HMAC_SHA1_ALGORITHM = "HmacSHA1";
    private static final long EXPIRES_INTERVAL = 300;

    public static String getAuthenticationStr(String cols, String accessID, String secretKey) {
        long expires = ((new Date()).getTime()) / 1000 + EXPIRES_INTERVAL;

        String stringToSign = accessID + "\n" + expires;

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes(), HMAC_SHA1_ALGORITHM);

        Mac mac = null;
        try {
            mac = Mac.getInstance(HMAC_SHA1_ALGORITHM);
            mac.init(signingKey);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            Logger.getLogger(CryptoUtils.class).info("getAuthenticationStr error: " + e);
            e.printStackTrace();
            return "";
        }

        // compute the hmac on input data bytes
        byte[] rawHmac = mac.doFinal(stringToSign.getBytes());

        // base64-encode the hmac
        String urlSafeSignature = URLEncoder.encode(encodeBase64(rawHmac));

        return cols + "&Limit=10&AccessID=" + accessID + "&Expires=" + expires + "&Signature=" + urlSafeSignature;
    }

    private static String encodeBase64(byte[] rawData) {
        return Base64.encodeBytes(rawData);
    }

    public static String encryptAES(String encryptedData, String iv, String sessionKey) {
        if (encryptedData == null || iv == null || sessionKey == null) {
            throw new CustomException("AES encrypt error: data or key is null");
        }
        try {
            // 被加密的数据
            byte[] dataByte = Base64.decode(encryptedData);
            // 加密秘钥
            byte[] keyByte = Base64.decode(sessionKey);
            // 偏移量
            byte[] ivByte = Base64.decode(iv);
            Logger.getLogger(CryptoUtils.class).debug("AES params: " + keyByte.length + " -- keyByte：" + Arrays.toString(keyByte) + " -- data: " + Arrays.toString(dataByte) + " -- iv: " + Arrays.toString(ivByte));
            int base = 16;
            if (keyByte.length % base != 0) {
                int groups = keyByte.length / base + (keyByte.length % base != 0 ? 1 : 0);
                byte[] temp = new byte[groups * base];
                Arrays.fill(temp, (byte) 0);
                System.arraycopy(keyByte, 0, temp, 0, keyByte.length);
                keyByte = temp;
            }

            Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding");
            Key sKeySpec = new SecretKeySpec(keyByte, "AES");
            AlgorithmParameters algorithmParameters = AlgorithmParameters.getInstance("AES");
            algorithmParameters.init(new IvParameterSpec(ivByte));
            cipher.init(Cipher.DECRYPT_MODE, sKeySpec, algorithmParameters);
            byte[] userInfo = cipher.doFinal(dataByte);
            String str = new String(userInfo, StandardCharsets.UTF_8);
            Logger.getLogger(CryptoUtils.class).debug("AES res: " + str);
            return str;
        } catch (BadPaddingException pwd) {
            throw new CustomException("AES encrypt error: session key is wrong!");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param sourceStr 要加密的字符串
     * @return 加密的字符串
     * SHA1加密
     */
    public static String sha1(String sourceStr) {
        try {
            MessageDigest digest = MessageDigest
                    .getInstance("SHA-1");
            digest.update(sourceStr.getBytes());
            byte[] messageDigest = digest.digest();

            StringBuilder hexString = new StringBuilder();
            for (byte aMessageDigest : messageDigest) {
                String shaHex = Integer.toHexString(aMessageDigest & 0xFF);
                if (shaHex.length() < 2) {
                    hexString.append(0);
                }
                hexString.append(shaHex);
            }
            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }

}
