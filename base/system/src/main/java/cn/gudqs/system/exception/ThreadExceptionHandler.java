package cn.gudqs.system.exception;

import cn.gudqs.util.LoggerUtil;
import cn.gudqs.util.StringUtil;
import org.springframework.stereotype.Component;

/**
 * @author wq
 * @date 2018/9/27
 * @description 线程异常统一处理
 */
@Component
public class ThreadExceptionHandler implements Thread.UncaughtExceptionHandler {

    @Override
    public void uncaughtException(Thread t, Throwable e) {
        LoggerUtil.info("thread error--> " + t.getName() + ": " + e);
        if (e.getMessage() != null) {
            String message = StringUtil.ellipsis(e.getMessage(), 30);
            message = t.getName() + "-" + message;
            LoggerUtil.error(message, t.getName());
        }
    }
}
