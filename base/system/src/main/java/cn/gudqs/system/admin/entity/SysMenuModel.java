package cn.gudqs.system.admin.entity;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author wq
 * @date 2019-4-23
 * @description 系统菜单表
 */
@Data
@Table(name = "sys_menu")
public class SysMenuModel {

    public SysMenuModel() { }

    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer sysMenuId;
    /**
     * 父级
     */
    private Integer parentId;
    /**
     * 菜单标题
     */
    private String menuText;
    /**
     * 菜单 url
     */
    private String menuUrl;
    /**
     * 排序
     */
    private Integer displayOrder;
    /**
     * 打开方式: 0.内部模块 1.iframe 2.新标签页 3.新窗口
     */
    private Integer openType;

}


