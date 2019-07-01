package cn.gudqs.util.token;

import cn.gudqs.exception.CustomException;
import cn.gudqs.helper.SpringContextUtil;
import cn.gudqs.util.JsonUtils;
import cn.gudqs.util.LoggerUtil;
import cn.gudqs.util.http.HttpUtils;
import cn.gudqs.util.redis.RedisUtils;

import java.io.IOException;
import java.util.Map;

/**
 * @author wq
 * @date 2018/10/22
 * @description super-token
 */
public class CommonWeChatToken {

    private static String accessTokenUrl;
    private static String tokenPrefix = "wechat:accessToken:";
    private static String tokenTimePrefix = "wechat:accessTokenTime:";
    private static String tokenExpirePrefix = "wechat:maxExpire:";

    private static void getResource() {
        if (accessTokenUrl == null) {
            accessTokenUrl = SpringContextUtil.getEnvironmentProperty("gzh.accessTokenUrl");
        }
    }

    public static String getAccessToken(String appKey, String appSecrete) throws Exception {
        getResource();
        LoggerUtil.debug("getToken: " + appKey, CommonWeChatToken.class);
        String tokenKey = tokenPrefix + appKey;
        boolean existsToken = RedisUtils.hasKey(tokenKey);
        if (!existsToken) {
            return refreshToken(appKey, appSecrete);
        }
        String accessToken = RedisUtils.get(tokenKey);
        String time = RedisUtils.get(tokenTimePrefix + appKey);
        String expire = RedisUtils.get(tokenExpirePrefix + appKey);
        if (time != null && expire != null) {
            long accessTokenTime = Long.parseLong(time);
            long maxExpire = Long.parseLong(expire);
            return returnByTime(appKey, appSecrete, accessToken, accessTokenTime, maxExpire);
        } else {
            throw new CustomException("get token error, redis data null");
        }
    }

    private static String returnByTime(String appKey, String appSecrete, String accessToken, long accessTokenTime, long maxExpire) throws IOException {
        long maxExpireMillis = maxExpire * 1000;
        if (System.currentTimeMillis() - accessTokenTime > maxExpireMillis) {
            return refreshToken(appKey, appSecrete);
        } else {
            return accessToken;
        }
    }

    public static String refreshToken(String appKey, String appSecrete) throws IOException {
        String result = HttpUtils.httpClientGet(accessTokenUrl
                .replaceAll("APPID", appKey)
                .replaceAll("APPSK", appSecrete), "");
        LoggerUtil.info("access token refresh -->result: " + result, CommonWeChatToken.class);
        Map<String, Object> obj = JsonUtils.getMap(result);
        String accessToken = (String) obj.get("access_token");
        long accessTokenTime = System.currentTimeMillis();
        long maxExpire = Long.parseLong(obj.get("expires_in").toString());

        RedisUtils.set(tokenPrefix + appKey, accessToken);
        RedisUtils.set(tokenTimePrefix + appKey, accessTokenTime + "");
        RedisUtils.set(tokenExpirePrefix + appKey, maxExpire + "");
        return accessToken;
    }

}
