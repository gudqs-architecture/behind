package cn.gudqs.system.admin.entity;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author wq
 * @date 2019-4-23
 * @description 系统角色
 */
@Data
@Table(name = "sys_role")
public class SysRoleModel {

    public SysRoleModel() { }

    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer sysRoleId;
    /**
     * 角色名
     */
    private String roleName;
    /**
     * 状态: 0.禁用 1.启用
     */
    private Integer status;

}


