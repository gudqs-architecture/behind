package cn.gudqs.business.common.service.impl;

import cn.gudqs.base.BaseServiceImpl;
import cn.gudqs.business.common.entity.SysRegionModel;
import cn.gudqs.business.common.mapper.SysRegionMapper;
import cn.gudqs.business.common.service.ISysRegionService;
import org.jboss.logging.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * @author generator by wq
 * @date 2019/05/06 10:17:30
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class SysRegionServiceImpl extends BaseServiceImpl<SysRegionModel> implements ISysRegionService {

    private Logger logger = Logger.getLogger(SysRegionServiceImpl.class);

    @Resource(type = SysRegionMapper.class)
    public void setSqlMapper(SysRegionMapper sqlMapper) {
        this.sqlMapper = sqlMapper;
    }


}
