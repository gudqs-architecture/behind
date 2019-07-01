package cn.gudqs.util.redis;

import cn.gudqs.helper.SpringContextUtil;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @author wq
 * @date 2018/9/22
 * @description
 */
public class RedisUtils {

    private static StringRedisTemplate stringRedisTemplate;

    private static void getInstance() {
        if (stringRedisTemplate == null) {
            stringRedisTemplate = SpringContextUtil.getBean(StringRedisTemplate.class);
        }
    }

    public static boolean hasFormId(String openId) {
        String formId = RedisUtils.getFormId(openId);
        if (formId != null) {
            RedisUtils.opsList().rightPush(openId, formId);
            return true;
        }
        return false;
    }

    public static String getFormId(String openId) {
        getInstance();
        if (openId == null) {
            return null;
        }
        ListOperations<String, String> listOperations = stringRedisTemplate.opsForList();
        if (listOperations.size(openId) > 0) {
            String formId = listOperations.rightPop(openId);
            while (formId != null && !stringRedisTemplate.hasKey(formId)) {
                if (listOperations.size(openId) > 0) {
                    formId = listOperations.rightPop(openId);
                } else {
                    // openId 取出的都过期了
                    return null;
                }
            }
            return formId;
        } else {
            return null;
        }
    }

    public static ListOperations<String, String> opsList() {
        getInstance();
        return stringRedisTemplate.opsForList();
    }

    public static HashOperations<String, Object, Object> opsHash() {
        getInstance();
        return stringRedisTemplate.opsForHash();
    }

    public static List<String> range(String key, Integer pageNo, Integer pageSize) {
        if (pageSize == null) {
            pageSize = 20;
        }
        return range(key, pageNo, pageSize.longValue());
    }

    public static List<String> range(String key, Integer pageNo, Long pageSize) {
        if (key == null) {
            return null;
        }
        getInstance();
        Boolean hasKey = stringRedisTemplate.hasKey(key);
        if (hasKey == null || !hasKey) {
            return null;
        }
        if (pageNo == null) {
            pageNo = 1;
        }
        if (pageSize == 0) {
            pageSize = (stringRedisTemplate.opsForList().size(key));
        }
        if (pageSize == null) {
            pageSize = 20L;
        }
        long start = (pageNo - 1) * pageSize;
        long end = (pageNo * pageSize);
        if (end > 0) {
            end -= 1;
        }
        return stringRedisTemplate.opsForList().range(key, start, end);
    }

    public static void leftPush(String key, String value) {
        getInstance();
        stringRedisTemplate.opsForList().remove(key, 0, value);
        stringRedisTemplate.opsForList().leftPush(key, value);
    }

    public static void rightPush(String key, String value) {
        getInstance();
        stringRedisTemplate.opsForList().remove(key, 0, value);
        stringRedisTemplate.opsForList().rightPush(key, value);
    }

    public static void set(String key, String value) {
        getInstance();
        stringRedisTemplate.opsForValue().set(key, value);
    }

    public static void set(String key, String value, long time, TimeUnit unit) {
        getInstance();
        stringRedisTemplate.opsForValue().set(key, value, time, unit);
    }

    public static void delete(String key) {
        getInstance();
        stringRedisTemplate.delete(key);
    }

    public static void expire(String key, Integer time, TimeUnit unit) {
        getInstance();
        stringRedisTemplate.expire(key, time, unit);
    }

    public static String get(String key) {
        getInstance();
        if (stringRedisTemplate.hasKey(key)) {
            return stringRedisTemplate.opsForValue().get(key);
        } else {
            return null;
        }
    }

    public static boolean hasKey(String key) {
        getInstance();
        return stringRedisTemplate.hasKey(key);
    }

}