package cn.gudqs.system.admin.service;

import cn.gudqs.base.IBaseService;
import cn.gudqs.system.admin.entity.SysUserModel;

/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
public interface ISysUserService extends IBaseService<SysUserModel> {

    /**
     * 根据登录名查询用户信息
     *
     * @param loginName 登录名
     * @return 用户信息
     */
    SysUserModel findByLoginName(String loginName);
}
