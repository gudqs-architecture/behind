package cn.gudqs.system.admin.service;

import cn.gudqs.base.IBaseService;
import cn.gudqs.system.admin.entity.SysRoleModel;

import java.util.List;

/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
public interface ISysRoleService extends IBaseService<SysRoleModel> {

    /**
     * 根据用户 id 查询其拥有查询角色
     *
     * @param sysUserId 用户 id
     * @return 角色集合
     */
    List<SysRoleModel> findBySysUserId(Integer sysUserId);

    /**
     * 为某用户添加某个角色
     *
     * @param sysUserId 用户 id
     * @param sysRoleId 角色 id
     */
    void addRole(Integer sysUserId, Integer sysRoleId);

    /**
     * 为某用户删除某个角色
     *
     * @param sysUserId 用户 id
     * @param sysRoleId 角色 id
     */
    void delRole(Integer sysUserId, Integer sysRoleId);
}
