package cn.gudqs.system.configuration;

import cn.gudqs.util.StringUtil;
import org.jboss.logging.Logger;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

/**
 * @author wq
 * @date 2019-01-07
 * @description 定时任务配置, 处理定时任务异常
 */
@EnableScheduling
@Configuration
public class SchedulingConfiguration implements SchedulingConfigurer {

    private final ThreadPoolTaskScheduler taskScheduler;

    SchedulingConfiguration() {
        taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.setErrorHandler(e -> {
            e.printStackTrace();
            if (!StringUtil.isBlank(e.getMessage())) {
                String message = StringUtil.ellipsis(e.getMessage(), 30);
                Logger.getLogger(SchedulingConfiguration.class).info("error on schedule--> msg: " + message);
            }
        });
        taskScheduler.setThreadNamePrefix("schedule-thread-");
        taskScheduler.setPoolSize(30);
        taskScheduler.initialize();
    }

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.setScheduler(taskScheduler);
    }
}
