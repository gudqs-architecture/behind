package cn.gudqs.system.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Properties;

/**
 * @author wq
 * @date 2018/9/19
 * @description 邮件工具类
 */
@Component
public class MailConfiguration {

    @Value("${mail.host}")
    private String host;
    @Value("${mail.port}")
    private Integer port;

    @Value("${mail.username}")
    private String account;
    @Value("${mail.password}")
    private String password;

    @Bean(name = "mailSender")
    public JavaMailSenderImpl getMailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(host);
        javaMailSender.setPort(port);
        javaMailSender.setUsername(account);
        javaMailSender.setPassword(password);
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.timeout", 25000);
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        javaMailSender.setJavaMailProperties(properties);
        return javaMailSender;
    }

}