package cn.gudqs.system.admin.entity;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author wq
 * @date 2019-4-23
 * @description 权限表
 */
@Data
@Table(name = "sys_auth")
public class SysAuthModel {

    public SysAuthModel() { }

    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer sysAuthId;
    /**
     * 菜单 id
     */
    private Integer sysMenuId;
    /**
     * 权限标识符
     */
    private String code;
    /**
     * 请求方法
     */
    private String method;
    /**
     * url 地址
     */
    private String url;

}


