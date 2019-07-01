package cn.gudqs.util;

import cn.gudqs.exception.CustomException;
import cn.gudqs.util.http.HttpUtils;
import com.qiniu.common.Zone;
import com.qiniu.storage.Configuration;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

/**
 * @author wq
 * @date 2018/11/22
 * @description 七牛云上传图片(文件)
 */
public class QiNiuUtil {

    private static Configuration cfg = new Configuration(Zone.zone2());

    public static String upload(InputStream inputStream) throws Exception {
        return upload(inputStream, null);
    }

    public static String upload(InputStream inputStream, String path) throws Exception {
        String token = getTokenFromCommonApi();
        String jsonStr = QiNiuUtils.upload(inputStream, path, token, cfg);
        return getPath(jsonStr);
    }

    private static String getPath(String jsonStr) {
        Map<String, Object> resMap = JsonUtils.getMap(jsonStr);
        return resMap.get("name").toString();
    }

    private static String getTokenFromCommonApi() throws IOException {
        String tokenMapStr = HttpUtils.httpClientGet("http://common.xiaolouyou.com/api/qiniu/token", "");
        if (StringUtil.isEmpty(tokenMapStr)) {
            throw new CustomException("七牛云公共服务响应异常");
        }
        Map<String, Object> map = JsonUtils.getMap(tokenMapStr);
        return map.get("uptoken").toString();
    }

    public static String upload(String dir, String path, String key) throws Exception {
        String token = getTokenFromCommonApi();
        String jsonStr = QiNiuUtils.upload(new File(dir, path), key, token, cfg);
        return getPath(jsonStr);
    }

    public String upload(String dir, String path) throws Exception {
        return upload(dir, path, null);
    }

}
