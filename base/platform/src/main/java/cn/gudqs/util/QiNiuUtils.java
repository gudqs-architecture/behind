package cn.gudqs.util;

import cn.gudqs.exception.CustomException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import lombok.Data;
import org.jboss.logging.Logger;

import java.io.File;
import java.io.InputStream;

/**
 * @author wq
 * @date 2018/11/22
 * @description 七牛云上传图片(文件)
 */
public class QiNiuUtils {

    private static Logger logger = Logger.getLogger(QiNiuUtils.class);

    /**
     * 通用流上传
     *
     * @param inputStream 文件流
     * @param key         自定义路径
     * @param token       七牛云 token
     * @param cfg         地域配置
     * @return 含 七牛云路径 的 json 字符串
     * @throws Exception e
     */
    public static String upload(InputStream inputStream, String key, String token, Configuration cfg) throws Exception {
        UploadManager um = new UploadManager(cfg);
        Response resp = um.put(inputStream, key, token, null, null);
        logger.info("uploadInputStream--> res: " + resp.bodyString());
        return resp.bodyString();
    }

    /**
     * 通用文件上传
     *
     * @param file  文件
     * @param key   自定义路径
     * @param token 七牛云 token
     * @param cfg   地域配置
     * @return 含七牛云路径的 json 串
     * @throws Exception e
     */
    public static String upload(File file, String key, String token, Configuration cfg) throws Exception {
        if (file == null || !file.exists()) {
            throw new CustomException("上传文件时, 文件不存在");
        }
        UploadManager um = new UploadManager(cfg);
        Response resp = um.put(file, key, token);
        logger.info("uploadFile--> res: " + resp.bodyString());
        return resp.bodyString();
    }

    private static String getToken(Config config) {
        Auth auth = Auth.create(config.getAccessKey(), config.getSecretKey());
        return auth.uploadToken(config.getBucket());
    }

    public static String uploadByConfig(InputStream inputStream, String key, Config config, Configuration cfg) throws Exception {
        String token = getToken(config);
        String jsonStr = upload(inputStream, key, token, cfg);
        return getPathByDefaultResult(jsonStr);
    }

    public static String uploadByConfig(InputStream inputStream, String key, Config config) throws Exception {
        return uploadByConfig(inputStream, key, config, getDefaultZone());
    }

    public static String uploadFileByConfig(String dir, String path, String key, Config config) throws Exception {
        return uploadFileByConfig(new File(dir, path), key, config);
    }

    public static String uploadFileByConfig(File file, String key, Config config) throws Exception {
        return uploadFileByConfig(file, key, config, getDefaultZone());
    }

    public static String uploadFileByConfig(File file, String key, Config config, Configuration cfg) throws Exception {
        String token = getToken(config);
        String jsonStr = upload(file, token, key, cfg);
        return getPathByDefaultResult(jsonStr);
    }

    private static Configuration getDefaultZone() {
        return new Configuration(Zone.zone2());
    }

    private static String getPathByDefaultResult(String jsonStr) {
        DefaultPutRet putRet = JsonUtils.getEntity(jsonStr, DefaultPutRet.class);
        return putRet.key;
    }

    @Data
    public static class Config {
        private String accessKey;
        private String secretKey;
        private String bucket;
    }

}
