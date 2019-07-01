package cn.gudqs.base.tkmapper;

import org.apache.ibatis.annotations.UpdateProvider;

/**
 * @author wq
 * @date 2019-05-08
 * @description platform
 */
public interface StatusMapper<T> {

    /**
     * 逻辑删除
     * @param ids id
     * @return 影响行数
     */
    @UpdateProvider(
            type = StatusProvider.class,
            method = "dynamicSQL"
    )
    int logicDelete(String ids);

    /**
     * 状态修改为打开
     * @param ids id
     * @return 影响行数
     */
    @UpdateProvider(
            type = StatusProvider.class,
            method = "dynamicSQL"
    )
    int turnOn(String ids);

    /**
     * 状态修改为关闭
     * @param ids id
     * @return 影响行数
     */
    @UpdateProvider(
            type = StatusProvider.class,
            method = "dynamicSQL"
    )
    int turnOff(String ids);

}
