package cn.gudqs.base;

import cn.gudqs.base.tkmapper.StatusMapper;
import tk.mybatis.mapper.common.BaseMapper;
import tk.mybatis.mapper.common.IdsMapper;

import java.util.List;
import java.util.Map;

/**
 * @author wq
 * @date 2018/5/8
 */
public interface BaseSqlMapper<T> extends BaseMapper<T>, IdsMapper<T>, StatusMapper<T> {

    /**
     * 统一查询总数
     * @return 总条数
     * @throws Exception 异常拦截
     * @param filters 查询条件
     */
    int count(Map<String, Object> filters) throws Exception;

    /**
     * 统一查找所有(带条件)
     * @param filters 条件 map
     * @return 多条结果
     * @throws Exception 异常拦截
     */
    List<T> findAll(Map<String, Object> filters) throws Exception;

}
