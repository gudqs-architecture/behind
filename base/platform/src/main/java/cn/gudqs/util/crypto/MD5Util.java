package cn.gudqs.util.crypto;

import cn.gudqs.exception.CustomException;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author wq
 * @date 2018/10/11
 * @description seo-new
 */
public class MD5Util {

    private static MessageDigest messageDigest = null;

    static {
        try {
            messageDigest = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获得字符串MD5钥匙
     *
     * @param str str
     * @return res
     */
    public static String getMD5(String str) {
        try {
            messageDigest.update(str.getBytes());
            return new BigInteger(1, messageDigest.digest()).toString(16);
        } catch (Exception e) {
            throw new CustomException("MD5加密出现错误");
        }
    }

}
