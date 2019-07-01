package cn.gudqs.util.redis;

import cn.gudqs.helper.SpringContextUtil;
import cn.gudqs.util.crypto.UUIDUtils;
import org.jboss.logging.Logger;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author wq
 * @date 2018/9/22
 * @description Redis 分布式锁
 */
public class RedisLock {

    private static final String LOCK_PREFIX = "mountain:{Schedule-Lock}:";
    private static final Long LOCK_SUCCESS = 1L;
    /**
     * 定义解锁的lua脚本
     */
    private final static DefaultRedisScript<Long> UNLOCK_LUA_SCRIPT = new DefaultRedisScript<>(
            "if redis.call(\"get\",KEYS[1]) == ARGV[1] then return redis.call(\"del\",KEYS[1]) else return -1 end"
            , Long.class
    );
    /**
     * 定义获取锁的lua脚本
     */
    private final static DefaultRedisScript<Long> LOCK_LUA_SCRIPT = new DefaultRedisScript<>(
            "if redis.call(\"setnx\", KEYS[1], ARGV[1]) == 1 then return redis.call(\"pexpire\", KEYS[1], ARGV[2]) else return 0 end"
            , Long.class
    );
    private static final Long RELEASE_SUCCESS = 1L;
    private static final Long LOCK_EXPIRED = -1L;
    private static StringRedisTemplate stringRedisTemplate;
    private static Logger logger = Logger.getLogger(RedisLock.class);
    private static ThreadLocal<String> localKeys = new ThreadLocal<>();
    private static ThreadLocal<String> localRequestIds = new ThreadLocal<>();

    private static void getInstance() {
        if (stringRedisTemplate == null) {
            stringRedisTemplate = SpringContextUtil.getBean(StringRedisTemplate.class);
        }
    }

    /**
     * 为某个 key 加锁
     *
     * @param key        Key
     * @param timeout    过期时间
     * @param retryTimes 重试次数
     * @return 是否成功
     */
    public static boolean lock(String key, long timeout, int retryTimes) {
        getInstance();
        try {
            final String redisKey = getRedisKey(key);
            final String requestId = getRequestId();
            logger.debug("lock--> redisKey = " + redisKey + " requestId= " + requestId);
            List<String> keys = Collections.singletonList(redisKey);
            List<String> args = Arrays.asList(requestId, String.valueOf(timeout));
            //执行脚本
            Long result = stringRedisTemplate.execute(LOCK_LUA_SCRIPT, keys, args.toArray());
            //存储本地变量
            if (!StringUtils.isEmpty(result) && result.equals(LOCK_SUCCESS)) {
                localRequestIds.set(requestId);
                localKeys.set(redisKey);
                logger.info("success to acquire lock:" + Thread.currentThread().getName());
                return true;
            } else if (retryTimes == 0) {
                return false;
            } else {
                //重试获取锁
                logger.info("retry to acquire lock:" + Thread.currentThread().getName() + ", Status code reply:" + result);
                int count = 0;
                while (true) {
                    try {
                        //休眠一定时间后再获取锁，这里时间可以通过外部设置
                        Thread.sleep(100);
                        result = stringRedisTemplate.execute(LOCK_LUA_SCRIPT, keys, args.toArray());
                        if (!StringUtils.isEmpty(result) && result.equals(LOCK_SUCCESS)) {
                            localRequestIds.set(requestId);
                            localKeys.set(redisKey);
                            logger.info("success to acquire lock:" + Thread.currentThread().getName() + ", Status code reply:" + result);
                            return true;
                        } else {
                            count++;
                            if (retryTimes == count) {
                                logger.info("fail to acquire lock for " + Thread.currentThread().getName() + ", Status code reply:" + result);
                                return false;
                            } else {
                                logger.warn(count + " times try to acquire lock for " + Thread.currentThread().getName() + ", Status code reply:" + result);
                            }
                        }
                    } catch (Exception e) {
                        logger.error("acquire redis occurred an exception:" + Thread.currentThread().getName(), e);
                        break;
                    }
                }
            }
        } catch (Exception e1) {
            logger.error("acquire redis occurred an exception:" + Thread.currentThread().getName(), e1);
        }
        return false;
    }

    /**
     * 获取RedisKey
     *
     * @param key 原始KEY，如果为空，自动生成随机KEY
     */
    private static String getRedisKey(String key) {
        //如果Key为空且线程已经保存，直接用，异常保护
        if (StringUtils.isEmpty(key) && !StringUtils.isEmpty(localKeys.get())) {
            return localKeys.get();
        }
        //如果都是空那就抛出异常
        if (StringUtils.isEmpty(key) && StringUtils.isEmpty(localKeys.get())) {
            throw new RuntimeException("key is null");
        }
        return LOCK_PREFIX + key;
    }

    /**
     * 获取随机请求ID
     */
    private static String getRequestId() {
        return UUIDUtils.newID();
    }

    /**
     * 释放KEY
     *
     * @param key key
     * @return 释放成功与否
     */
    public static boolean unlock(String key) {
        try {
            String localKey = localKeys.get();
            //如果本地线程没有KEY，说明还没加锁，不能释放
            if (StringUtils.isEmpty(localKey)) {
                logger.error("release lock occurred an error: lock key not found");
                return false;
            }
            String redisKey = getRedisKey(key);
            //判断KEY是否正确，不能释放其他线程的KEY
            if (!StringUtils.isEmpty(localKey) && !localKey.equals(redisKey)) {
                logger.error("release lock occurred an error: illegal key:" + key);
                return false;
            }
            //组装lua脚本参数
            List<String> keys = Collections.singletonList(redisKey);
            List<String> args = Collections.singletonList(localRequestIds.get());
            logger.debug("unlock--> redisKey = " + redisKey + " requestId = " + localRequestIds.get());
            // 使用lua脚本删除redis中匹配value的key，可以避免由于方法执行时间过长而redis锁自动过期失效的时候误删其他线程的锁
            Long result = stringRedisTemplate.execute(UNLOCK_LUA_SCRIPT, keys, args.toArray());
            //如果这里抛异常，后续锁无法释放
            if (!StringUtils.isEmpty(result) && result.equals(RELEASE_SUCCESS)) {
                logger.info("release lock success:" + Thread.currentThread().getName() + ", Status code reply=" + result);
                return true;
            } else if (!StringUtils.isEmpty(result) && result.equals(LOCK_EXPIRED)) {
                //返回-1说明获取到的KEY值与requestId不一致或者KEY不存在，可能已经过期或被其他线程加锁
                // 一般发生在key的过期时间短于业务处理时间，属于正常可接受情况
                logger.warn("release lock exception:" + Thread.currentThread().getName() + ", key has expired or released. Status code reply=" + result);
            } else {
                //其他情况，一般是删除KEY失败，返回0
                logger.error("release lock failed:" + Thread.currentThread().getName() + ", del key failed. Status code reply=" + result);
            }
        } catch (Exception e) {
            logger.error("release lock occurred  an exception", e);
        } finally {
            clean();
        }
        return false;
    }

    /**
     * 清除本地线程变量，防止内存泄露
     */
    private static void clean() {
        localRequestIds.remove();
        localKeys.remove();
    }
}