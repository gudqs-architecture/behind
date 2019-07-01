package cn.gudqs.helper;

/**
 * @author wq
 * @date 2019-05-08
 * @description qing-yuan-api
 */
public interface CommonCache<K, V> {

    /**
     * get
     *
     * @param key key
     * @return value
     */
    V get0(K key);

    /**
     * get
     *
     * @param key key
     * @return value
     */
    V get(K key);

    /**
     * set
     *
     * @param key   key
     * @param value value
     */
    void set(K key, V value);

    /**
     * exists
     *
     * @param key key
     * @return exists or not
     */
    boolean has(K key);

    /**
     * loadData from db
     *
     * @param key key
     * @return value
     */
    V loadDataFromDb(K key);

}
