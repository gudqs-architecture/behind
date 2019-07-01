package cn.gudqs.system.admin.service;

import cn.gudqs.base.IBaseService;
import cn.gudqs.system.admin.entity.SysAuthModel;

import java.util.List;

/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
public interface ISysAuthService extends IBaseService<SysAuthModel> {

    /**
     * 根据系统用户 id 查询所有权限
     *
     * @param userId 用户 id
     * @return 权限集合
     */
    List<SysAuthModel> findBySysUserId(Integer userId);

    /**
     * 根据系统用户 id 查询所有权限
     *
     * @param sysRoleId 角色id
     * @return 权限集合
     */
    List<SysAuthModel> findBySysRoleId(Integer sysRoleId);

    /**
     * 为某角色添加一个权限
     *
     * @param sysRoleId 角色id
     * @param sysAuthId 权限
     */
    void addAuth(Integer sysRoleId, Integer sysAuthId);

    /**
     * 为某角色删除一个权限
     *
     * @param sysRoleId 角色id
     * @param sysAuthId 权限
     */
    void delAuth(Integer sysRoleId, Integer sysAuthId);

    /**
     * 判断用户是否有此 url 权限
     *
     * @param sysUserId 用户 id
     * @param url       url
     * @return true:有
     */
    boolean hasPermission(int sysUserId, String url);
}
