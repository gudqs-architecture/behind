package cn.gudqs.util;

import cn.gudqs.exception.CustomException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import cn.gudqs.base.MapBean;
import org.jboss.logging.Logger;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author wq
 * @date 2018/5/8
 */
public class JsonUtils {

    private final static ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    static {
        OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    private JsonUtils() {

    }

    public static ObjectMapper getInstance() {
        return OBJECT_MAPPER;
    }

    /**
     * javaBean,list,array convert to json string
     */
    public static String getJsonString(Object obj) {
        if (obj == null) {
            return null;
        }
        try {
            return OBJECT_MAPPER.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            Logger.getLogger(JsonUtils.class).error("getMap--> error: " + e.toString());
            throw new CustomException("JSON 格式化失败");
        }
    }

    /**
     * json string convert to javaBean
     */
    public static <T> T getEntity(String jsonStr, Class<T> clazz) {
        try {
            return OBJECT_MAPPER.readValue(jsonStr, clazz);
        } catch (IOException e) {
            Logger.getLogger(JsonUtils.class).error("getMap--> error: " + e.toString());
            throw new CustomException("JSON 解析失败");
        }
    }

    /**
     * json string convert to map
     */
    public static <T> Map<String, Object> getMap(String jsonStr) {
        try {
            return OBJECT_MAPPER.readValue(jsonStr, Map.class);
        } catch (IOException e) {
            Logger.getLogger(JsonUtils.class).error("getMap--> error: " + e.toString());
            throw new CustomException("JSON 解析失败");
        }
    }

    /**
     * json string convert to map with javaBean
     */
    public static <T> Map<String, T> getMap(String jsonStr, Class<T> clazz) {
        try {
            Map<String, Map<String, Object>> map = OBJECT_MAPPER.readValue(jsonStr,
                    new TypeReference<Map<String, T>>() {
                    });
            ;
            Map<String, T> result = new HashMap<>(10);
            for (Map.Entry<String, Map<String, Object>> entry : map.entrySet()) {
                result.put(entry.getKey(), getEntity(entry.getValue(), clazz));
            }
            return result;
        } catch (IOException e) {
            Logger.getLogger(JsonUtils.class).error("getMap--> error: " + e.toString());
            throw new CustomException("JSON 解析失败");
        }
    }

    /**
     * json array string convert to list with javaBean
     */
    public static <T> List<T> getEntityList(String jsonArrayStr, Class<T> clazz) {
        try {
            List<Map<String, Object>> list = OBJECT_MAPPER.readValue(jsonArrayStr,
                    new TypeReference<List<T>>() {
                    });
            List<T> result = new ArrayList<T>();
            for (Map<String, Object> map : list) {
                result.add(getEntity(map, clazz));
            }
            return result;
        } catch (IOException e) {
            Logger.getLogger(JsonUtils.class).error("getMap--> error: " + e.toString());
            throw new CustomException("JSON 解析失败");
        }
    }


    public static List<MapBean> getEntityList(String jsonArrayStr) {
        try {
            return OBJECT_MAPPER.readValue(jsonArrayStr, new TypeReference<List<MapBean>>() {
            });
        } catch (IOException e) {
            Logger.getLogger(JsonUtils.class).error("getMap--> error: " + e.toString());
            throw new CustomException("JSON 解析失败");
        }
    }


    public static <T> T getEntity(Map map, Class<T> clazz) {
        return OBJECT_MAPPER.convertValue(map, clazz);
    }

    public static List<Object> getObjectArray(String json) {
        try {
            return OBJECT_MAPPER.readValue(json, new TypeReference<List<Object>>() {
            });
        } catch (IOException e) {
            Logger.getLogger(JsonUtils.class).error("getMap--> error: " + e.toString());
            throw new CustomException("JSON 解析失败");
        }
    }
}

