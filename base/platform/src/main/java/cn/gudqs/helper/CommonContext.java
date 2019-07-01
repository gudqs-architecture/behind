package cn.gudqs.helper;

/**
 * @author wq
 * @date 2019-05-10
 * @description qing-yuan-api
 */
public interface CommonContext<V> {

    /**
     * get
     *
     * @return v
     */
    V get();

    /**
     * set
     *
     * @param v val
     */
    void set(V v);

    /**
     * set
     *
     */
    void remove();

}
