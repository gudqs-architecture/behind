package cn.gudqs.base;

import java.util.List;
import java.util.Map;

/**
 * @author wq
 * @date 2018/5/8
 */
public interface IBaseService<T> {

    /**
     * 统一新增
     * @param entity 实体
     * @throws Exception 异常拦截
     */
     void insert(T entity) throws Exception;

    /**
     * 统一修改
     *
     * @param entity 实体
     * @throws Exception 异常拦截
     */
     void update(T entity) throws Exception;

    /**
     * 统一修改
     *
     * @param entity 实体
     * @throws Exception 异常拦截
     */
     void updateSelective(T entity) throws Exception;

    /**
     * 统一新增 带默认值
     *
     * @param entity 实体
     * @throws Exception 异常拦截
     */
     void insertSelective(T entity) throws Exception;

    /**
     * 统一删除
     *
     * @param ids id 数组
     * @throws Exception 异常拦截
     */
    void delete(Object[] ids) throws Exception;

    /**
     * 统一查找单个
     *
     * @param id  实体 id
     * @return 单个结果
     * @throws Exception 异常拦截
     */
     T findById(Integer id) throws Exception;

    /**
     * 统一查找所有(无条件)
     * @return 多条结果
     * @throws Exception 异常拦截
     */
     List<T> findAll() throws Exception;

    /**
     * 统一查找所有(带条件)
     *
     * @param filters 条件 map
     * @return 多条结果
     * @throws Exception 异常拦截
     */
     List<T> findAll(Map<String, Object> filters) throws Exception;

    /**
     * 根据 实体属性 查找 记录
     *
     * @param filter 过滤
     * @return 记录
     */
    List<T> select(T filter);

    /**
     * 根据 实体属性 查找 记录
     *
     * @param filter 过滤
     * @return 记录
     */
    T selectOne(T filter);

    /**
     * 表格组件的方法
     *
     * @param paramVo 参数
     * @param filter  其他条件
     * @throws Exception 异常拦截
     * @return 结果
     */
    PageEntity<T> findAll(ParamVo paramVo, MapBean filter) throws Exception;

    /**
     * 同上
     *
     * @param paramVo 条件
     * @return 结果
     * @throws Exception 异常拦截
     */
    PageEntity<T> findAll(ParamVo paramVo) throws Exception;


    /**
     * 逻辑删除
     * @param ids id
     * @return 影响行数
     */
    int logicDelete(Object[] ids);

    /**
     * 状态修改为打开
     * @param ids id
     * @return 影响行数
     */
    int turnOn(Object[] ids);

    /**
     * 状态修改为关闭
     * @param ids id
     * @return 影响行数
     */
    int turnOff(Object[] ids);
}
