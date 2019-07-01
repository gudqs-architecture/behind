package cn.gudqs.business.common.service.impl;

import cn.gudqs.base.BaseServiceImpl;
import cn.gudqs.business.common.entity.SysDictionaryModel;
import cn.gudqs.business.common.mapper.SysDictionaryMapper;
import cn.gudqs.business.common.service.ISysDictionaryService;
import org.jboss.logging.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author generator by wq
 * @date 2019/05/06 10:12:24
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class SysDictionaryServiceImpl extends BaseServiceImpl<SysDictionaryModel> implements ISysDictionaryService {

    private Logger logger = Logger.getLogger(SysDictionaryServiceImpl.class);
    private SysDictionaryMapper sysDictionaryMapper;

    @Resource(type = SysDictionaryMapper.class)
    public void setSqlMapper(SysDictionaryMapper sqlMapper) {
        this.sqlMapper = sqlMapper;
        sysDictionaryMapper = sqlMapper;
    }


    @Override
    public List<SysDictionaryModel> findByParentCode(String parentCode) {
        return sysDictionaryMapper.findByParentCode(parentCode);
    }
}
