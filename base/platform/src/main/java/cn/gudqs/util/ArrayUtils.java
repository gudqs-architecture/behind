package cn.gudqs.util;

import java.util.Arrays;
import java.util.List;

/**
 * @author wq
 * @date 2018/9/21
 * @description array util
 */
public class ArrayUtils {

    public static <T> T[] wrapper(T... cid) {
        if (cid != null && cid.length > 0) {
            return cid;
        } else {
            return null;
        }
    }

    public static <T> List<T> wrapperList(T... items) {
        if (items != null && items.length > 0) {
            return Arrays.asList(items);
        } else {
            return null;
        }
    }

}
