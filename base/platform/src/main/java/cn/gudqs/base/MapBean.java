package cn.gudqs.base;

import java.util.HashMap;
import java.util.Map;

/**
 * @author wq
 * @date 2018/5/8
 */
public class MapBean extends HashMap<String, Object> implements Map<String, Object> {

    public String getString(String key) {
        return (String) this.get(key);
    }

    public Integer getInteger(String key) {
        return (Integer) this.get(key);
    }

    public Float getFloat(String key) {
        return (Float) this.get(key);
    }

    public Double getDouble(String key) {
        return (Double) this.get(key);
    }

    public <T> T getEntity(String key){
        return (T) this.get(key);
    }

    public boolean has(String key) {
        return this.containsKey(key);
    }
}
