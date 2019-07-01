package cn.gudqs.system.admin.service.impl;

import cn.gudqs.base.BaseServiceImpl;
import cn.gudqs.system.admin.entity.SysRoleModel;
import cn.gudqs.system.admin.mapper.SysRoleMapper;
import cn.gudqs.system.admin.service.ISysRoleService;
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
public class SysRoleServiceImpl extends BaseServiceImpl<SysRoleModel> implements ISysRoleService {

    private Logger logger = Logger.getLogger(SysRoleServiceImpl.class);
    private SysRoleMapper sysRoleMapper;

    @Resource(type = SysRoleMapper.class)
    public void setSqlMapper(SysRoleMapper sqlMapper) {
        this.sqlMapper = sqlMapper;
        sysRoleMapper = sqlMapper;
    }


    @Override
    public List<SysRoleModel> findBySysUserId(Integer sysUserId) {
        return sysRoleMapper.findBySysUserId(sysUserId);
    }

    @Override
    public void addRole(Integer sysUserId, Integer sysRoleId) {
        sysRoleMapper.addRole(sysUserId, sysRoleId);
    }

    @Override
    public void delRole(Integer sysUserId, Integer sysRoleId) {
        sysRoleMapper.delRole(sysUserId, sysRoleId);
    }
}
