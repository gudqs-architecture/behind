package cn.gudqs.system.admin.service.impl;

import cn.gudqs.base.BaseServiceImpl;
import cn.gudqs.system.admin.entity.SysMenuModel;
import cn.gudqs.system.admin.mapper.SysMenuMapper;
import cn.gudqs.system.admin.service.ISysMenuService;
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
public class SysMenuServiceImpl extends BaseServiceImpl<SysMenuModel> implements ISysMenuService {

    private Logger logger = Logger.getLogger(SysMenuServiceImpl.class);
    private SysMenuMapper menuMapper;

    @Resource(type = SysMenuMapper.class)
    public void setSqlMapper(SysMenuMapper sqlMapper) {
        this.sqlMapper = sqlMapper;
        menuMapper = sqlMapper;
    }

    @Override
    public List<SysMenuModel> findBySysUserId(Integer userId) {
        return menuMapper.findBySysUserId(userId);
    }

    @Override
    public List<SysMenuModel> findBySysRoleId(Integer sysRoleId) {
        return menuMapper.findBySysRoleId(sysRoleId);
    }

    @Override
    public void addMenu(Integer menuId, Integer sysRoleId) {
        menuMapper.addMenu(menuId, sysRoleId);
    }

    @Override
    public void delMenu(Integer menuId, Integer sysRoleId) {
        menuMapper.delMenu(menuId, sysRoleId);
    }
}
