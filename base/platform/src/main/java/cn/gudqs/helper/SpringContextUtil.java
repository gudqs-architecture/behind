package cn.gudqs.helper;

import cn.gudqs.exception.CustomException;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * @author wq
 */
@Component
public class SpringContextUtil implements ApplicationContextAware {
    private static ApplicationContext context = null;

    public static <T> T getBean(Class<T> beanClass) {
        if (context == null) {
            throw new CustomException("context not init!");
        }
        return context.getBean(beanClass);
    }

    public static <T> T getBean(String beanClass) {
        if (context == null) {
            throw new CustomException("context not init!");
        }
        return (T) context.getBean(beanClass);
    }

    public static String getEnvironmentProperty(String property) {
        if (context == null) {
            throw new CustomException("context not init!");
        }
        return context.getEnvironment().getProperty(property);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }
}
