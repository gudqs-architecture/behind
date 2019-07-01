package cn.gudqs.util.crypto;

import cn.gudqs.util.MathUtil;

import java.util.HashSet;
import java.util.UUID;

/**
 * @author wq
 * @date 2018/5/8
 */
public class UUIDUtils {

    public static String newID() {
        return UUID.randomUUID().toString().toUpperCase();
    }

    public static String shortUUID() {
        String uuid = newID();
        String[] split = uuid.split("-");
        StringBuilder res = null;
        if (split.length > 4) {
            res = new StringBuilder(split[1] + "-" + split[2] + "-" + split[3]);
        }
        assert res != null;
        res.append("-");
        for (int i = 0; i < 4; i++) {
            Integer randomInt = MathUtil.randomInt(0, 16);
            res.append(Integer.toHexString(randomInt).toUpperCase());
        }
        return res.toString();
    }

    private static final String TABLES = "23456789abcdefghjkmnpqrstuvwxyzABCDEFGHIJKMNPQRSTUVWXYZ";
    private static final String TABLES_INT = "0123456789";
    private static final String TABLES_BIG = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
    private static final String TABLES_SMALL = "23456789abcdefghjkmnpqrstuvwxyz";

    public static String nonceStrSmall(int length) {
        return getStrByTable(length, TABLES_SMALL);
    }

    public static String nonceStrBig(int length) {
        return getStrByTable(length, TABLES_BIG);
    }

    public static String nonceStr(int length) {
        return getStrByTable(length, TABLES);
    }

    private static String getStrByTable(int length, String tables) {
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < length; i++) {
            Integer randomInt = MathUtil.randomInt(0, tables.length());
            res.append(tables.toCharArray()[randomInt]);
        }
        return res.toString();
    }


    public static String nonceStrInt(int length) {
        return getStrByTable(length, TABLES_INT);
    }

    public static void main(String[] args) {
        HashSet<String> res = new HashSet<>();
        for (int i = 0; i < 1000; i++) {
            String s = nonceStrInt(4);
            res.add(s);
            System.out.println(s);

        }
        System.out.println(res.size());
    }

}
