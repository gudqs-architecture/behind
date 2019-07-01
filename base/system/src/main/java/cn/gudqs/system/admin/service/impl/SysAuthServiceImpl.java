package cn.gudqs.system.admin.service.impl;

import cn.gudqs.base.BaseServiceImpl;
import cn.gudqs.system.admin.entity.SysAuthModel;
import cn.gudqs.system.admin.mapper.SysAuthMapper;
import cn.gudqs.system.admin.service.ISysAuthService;
import org.jboss.logging.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class SysAuthServiceImpl extends BaseServiceImpl<SysAuthModel> implements ISysAuthService {

    private Logger logger = Logger.getLogger(SysAuthServiceImpl.class);

    private SysAuthMapper authMapper;

    @Resource(type = SysAuthMapper.class)
    public void setSqlMapper(SysAuthMapper sqlMapper) {
        this.sqlMapper = sqlMapper;
        authMapper = sqlMapper;
    }

    @Override
    public List<SysAuthModel> findBySysUserId(Integer userId) {
        return authMapper.findBySysUserId(userId);
    }

    @Override
    public List<SysAuthModel> findBySysRoleId(Integer sysRoleId) {
        return authMapper.findBySysRoleId(sysRoleId);
    }

    @Override
    public void addAuth(Integer sysRoleId, Integer sysAuthId) {
        authMapper.addAuth(sysRoleId, sysAuthId);
    }

    @Override
    public void delAuth(Integer sysRoleId, Integer sysAuthId) {
        authMapper.delAuth(sysRoleId, sysAuthId);
    }

    @Override
    public boolean hasPermission(int sysUserId, String url) {
        Integer existsAuth = authMapper.findAuthByUrl(sysUserId, url);
        return existsAuth != null;
    }

}
