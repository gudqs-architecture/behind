package cn.gudqs.system.admin.service.impl;

import cn.gudqs.base.BaseServiceImpl;
import cn.gudqs.base.BaseSqlMapper;
import cn.gudqs.system.admin.entity.SysUserModel;
import cn.gudqs.system.admin.mapper.SysUserMapper;
import cn.gudqs.system.admin.service.ISysUserService;
import org.jboss.logging.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class SysUserServiceImpl extends BaseServiceImpl<SysUserModel> implements ISysUserService {

    private Logger logger = Logger.getLogger(SysUserServiceImpl.class);

    @Resource(type = SysUserMapper.class)
    public void setSqlMapper(BaseSqlMapper sqlMapper) {
        this.sqlMapper = sqlMapper;
    }


    @Override
    public SysUserModel findByLoginName(String loginName) {
        return sqlMapper.selectOne(new SysUserModel(loginName));
    }
}
