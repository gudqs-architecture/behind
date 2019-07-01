package cn.gudqs.business.common.mapper;

import cn.gudqs.base.BaseSqlMapper;
import cn.gudqs.business.common.entity.SysDictionaryModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author generator by wq
 * @date 2019/05/06 10:12:24
 */
@Repository
public interface SysDictionaryMapper extends BaseSqlMapper<SysDictionaryModel> {

    /**
     * 根据字典 code 查询字典数据
     *
     * @param parentCode code
     * @return 字典数据
     */
    List<SysDictionaryModel> findByParentCode(String parentCode);
}
