package cn.gudqs.system.admin.entity;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.List;

/**
 * @author wq
 * @date 2019-4-23
 * @description 系统用户
 */
@Data
@Table(name = "sys_user")
public class SysUserModel {

    public SysUserModel() { }

    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer sysUserId;
    /**
     * 登录名
     */
    private String loginName;
    /**
     * 登录密码: md5(name+password)
     */
    private String password;
    /**
     * 昵称
     */
    private String nickName;
    /**
     * 头像
     */
    private String avatarUrl;
    /**
     * 状态: 0.禁用 1.启用
     */
    private Integer status;

    @Transient
    private List<String> sysRoleIds;

    @Transient
    private List<String> delSysRoleIds;

    public SysUserModel(String loginName) {
        this.loginName = loginName;
    }
}


