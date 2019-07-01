package cn.gudqs.business.common.service;

import cn.gudqs.base.IBaseService;
import cn.gudqs.business.common.entity.SysDictionaryModel;

import java.util.List;

/**
 * @author generator by wq
 * @date 2019/05/06 10:12:24
 */
public interface ISysDictionaryService extends IBaseService<SysDictionaryModel> {

    /**
     * 根据字典 code 查询字典数据
     *
     * @param parentCode code
     * @return 字典数据
     */
    List<SysDictionaryModel> findByParentCode(String parentCode);
}
