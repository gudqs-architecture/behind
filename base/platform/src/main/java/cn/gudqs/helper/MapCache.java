package cn.gudqs.helper;

import java.util.HashMap;
import java.util.Map;

/**
 * @author wq
 * @date 2019-05-08
 * @description qing-yuan-api
 */
public class MapCache<K, V> implements CommonCache<K, V> {

    private Map<K, V> cacheMap = new HashMap<>(20);


    @Override
    public V get0(K key) {
        return cacheMap.get(key);
    }

    @Override
    public V get(K key) {
        if (key == null) {
            return null;
        }
        if (!has(key)) {
            V val = loadDataFromDb(key);
            set(key, val);
            return val;
        }
        return get0(key);
    }

    @Override
    public void set(K key, V value) {
        if (value != null) {
            cacheMap.put(key, value);
        }
    }

    @Override
    public boolean has(K key) {
        return cacheMap.containsKey(key);
    }

    @Override
    public V loadDataFromDb(K key) {
        return null;
    }

}
