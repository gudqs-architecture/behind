package cn.gudqs.system.configuration;

import cn.gudqs.mybatis.interceptor.SqlInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

/**
 * @author wq
 * @date 2018/10/10
 * @description seo-new
 */

@Configuration
public class MybatisConfiguration {

    @Bean
    public SqlInterceptor sqlStatsInterceptor() {
        SqlInterceptor sqlStatsInterceptor = new SqlInterceptor();
        Properties properties = new Properties();
        properties.setProperty("dialect", "mysql");
        sqlStatsInterceptor.setProperties(properties);
        return sqlStatsInterceptor;
    }
}
