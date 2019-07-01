package cn.gudqs.base.tkmapper;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author wq
 * @date 2019-05-08
 * @description platform
 */
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Status {

    int on() default 1;

    int off() default 0;

    int delete() default -1;

}
