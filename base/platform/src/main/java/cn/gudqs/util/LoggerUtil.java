package cn.gudqs.util;

import org.jboss.logging.Logger;

/**
 * @author wq
 * @date 2019-02-25
 * @description 日志工具类
 */
public class LoggerUtil {

    public static void info(String msg, Class clazz) {
        Logger.getLogger(clazz).info(msg);
    }

    public static void error(String msg, Class clazz) {
        Logger.getLogger(clazz).error(msg);
    }

    public static void debug(String msg, Class clazz) {
        Logger.getLogger(clazz).debug(msg);
    }

    public static void info(String msg) {
        info(msg, "default-info-name");
    }

    public static void info(String msg, String name) {
        Logger.getLogger(name).info(msg);
    }

    public static void error(String msg) {
        error(msg, "default-error-name");
    }

    public static void error(String msg, String name) {
        Logger.getLogger(name).error(msg);
    }

    public static void debug(String msg) {
        debug(msg, "default-debug-name");
    }

    public static void debug(String msg, String name) {
        Logger.getLogger(name).debug(msg);
    }

    public static void onlyFile(String msg) {
        System.out.println(msg);
    }

}
