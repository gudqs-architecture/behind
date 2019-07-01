package cn.gudqs.system.admin.mapper;

import cn.gudqs.base.BaseSqlMapper;
import cn.gudqs.system.admin.entity.SysAuthModel;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
@Repository
public interface SysAuthMapper extends BaseSqlMapper<SysAuthModel> {

    /**
     * 根据系统角色 id 查询所有权限
     *
     * @param sysRoleId 角色 id
     * @return 权限集合
     */
    List<SysAuthModel> findBySysRoleId(Integer sysRoleId);

    /**
     * 根据系统用户 id 查询所有权限
     *
     * @param userId 用户 id
     * @return 权限集合
     */
    List<SysAuthModel> findBySysUserId(Integer userId);

    /**
     * 为某角色添加一个权限
     *
     * @param sysRoleId 角色id
     * @param sysAuthId 权限
     */
    void addAuth(@Param("sysRoleId") Integer sysRoleId, @Param("sysAuthId") Integer sysAuthId);

    /**
     * 为某角色删除一个权限
     *
     * @param sysRoleId 角色id
     * @param sysAuthId 权限
     */
    void delAuth(@Param("sysRoleId") Integer sysRoleId, @Param("sysAuthId") Integer sysAuthId);

    /**
     * 判断用户是否有 url 权限
     *
     * @param sysUserId 用户 id
     * @param url       url
     * @return 不为 null 则有权限
     */
    Integer findAuthByUrl(@Param("sysUserId") int sysUserId, @Param("url") String url);
}
