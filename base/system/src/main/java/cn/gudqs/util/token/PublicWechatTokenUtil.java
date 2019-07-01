package cn.gudqs.util.token;

import cn.gudqs.helper.SpringContextUtil;

/**
 * @author wq
 * @date 2018/10/22
 * @description jd-plus
 */
public class PublicWechatTokenUtil {

    private static String appKey;
    private static String appSecrete;


    private static void getResource() {
        if (appKey == null || appSecrete == null) {
            appKey = SpringContextUtil.getEnvironmentProperty("gzh.appId");
            appSecrete = SpringContextUtil.getEnvironmentProperty("gzh.appSecrete");
        }
    }

    public static String getAccessToken() throws Exception {
        getResource();
        return CommonWeChatToken.getAccessToken(appKey, appSecrete);
    }

    public static String getAccessTokenForce() throws Exception {
        getResource();
        return CommonWeChatToken.refreshToken(appKey, appSecrete);
    }

}
