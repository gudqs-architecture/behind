package cn.gudqs.system.admin.mapper;

import cn.gudqs.base.BaseSqlMapper;
import cn.gudqs.system.admin.entity.SysMenuModel;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
@Repository
public interface SysMenuMapper extends BaseSqlMapper<SysMenuModel> {

    /**
     * 根据系统用户 id 查询其拥有的菜单权利
     *
     * @param userId 用户 id
     * @return 菜单集合
     */
    List<SysMenuModel> findBySysUserId(Integer userId);

    /**
     * 根据系统用户 id 查询其拥有的菜单权利
     *
     * @param sysRoleId 角色 id
     * @return 菜单集合
     */
    List<SysMenuModel> findBySysRoleId(Integer sysRoleId);


    /**
     * 为某角色添加一个菜单
     *
     * @param menuId    菜单 id
     * @param sysRoleId 角色 id
     */
    void addMenu(@Param("sysMenuId") Integer menuId, @Param("sysRoleId") Integer sysRoleId);

    /**
     * 为某角色删除一个菜单
     *
     * @param menuId    菜单 id
     * @param sysRoleId 角色 id
     */
    void delMenu(@Param("sysMenuId") Integer menuId, @Param("sysRoleId") Integer sysRoleId);
}
