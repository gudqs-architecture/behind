package cn.gudqs.util;

import javax.servlet.http.HttpServletRequest;

/**
 * @author wq
 * @date 2019-02-06
 * @description platform 公共工具类
 */
public class CommonUtil {

    private static final String uidField = "uid";

    public static String getRealIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (StringUtil.isBlank(ip)) {
            ip = request.getHeader("X-Real-IP");
            if (StringUtil.isBlank(ip)) {
                ip = request.getRemoteAddr();
            }
        } else {
            String[] ipArr = ip.split(",");
            if (ipArr.length >= 1) {
                ip = ipArr[0];
            }
        }
        return ip;
    }

    public static String getPathVar(String url, String key) {
        boolean wrongUrl = url == null || !url.contains("?");
        if (wrongUrl) {
            return null;
        }

        String[] urlSp = url.split("\\?");
        String vars = urlSp[1];
        String[] varArray = vars.split("&");
        for (String var : varArray) {
            String[] kv = var.split("=");
            if (key.equals(kv[0])) {
                return kv[1];
            }
        }
        return null;
    }

    public static boolean isDev(String env) {
        return "dev".equals(env);
    }

    public static void setUserId(String userId, HttpServletRequest request) {
        request.setAttribute(uidField, Integer.parseInt(userId));
    }

    public static Integer getUserId(HttpServletRequest request) {
        if (request == null) {
            return null;
        }
        Object uid = request.getAttribute(CommonUtil.uidField);
        if (uid == null) {
            return null;
        }
        if (uid instanceof Integer) {
            return (Integer) uid;
        } else {
            return null;
        }
    }

}
