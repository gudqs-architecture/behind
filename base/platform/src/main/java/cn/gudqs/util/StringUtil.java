package cn.gudqs.util;

/**
 * @author wq
 * @date 2018/10/30
 * @description jd-plus
 */
public class StringUtil {

    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    public static boolean isBlank(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static String format(String str, Object... args) {
        for (Object arg : args) {
            String argStr = "null";
            if (arg != null) {
                argStr = arg.toString();
            }
            str = str.replaceFirst("%s", argStr);
        }
        return str;
    }

    public static String ellipsisSimple(String str, Integer maxLength) {
        if (str == null) {
            return null;
        }
        Integer length = str.length();
        if (length <= maxLength) {
            return str;
        } else {
            return str.substring(0, maxLength) + "..";
        }
    }

    public static String ellipsis(String str, Integer maxLength) {
        if (str == null) {
            return null;
        }
        Integer length = realLength(str);
        if (length <= maxLength) {
            return str;
        } else {
            return realSub(str, 0, maxLength) + "..";
        }
    }

    public static String decimal(Float value, Integer maxLength) {
        if (value == null) {
            return "";
        }
        String str = value.toString();
        if (str.lastIndexOf(".") != -1) {
            String[] split = str.split("\\.");
            if (split.length == 2) {
                String first = split[0];
                String last = split[1];
                if (last.length() > maxLength) {
                    last = last.substring(0, maxLength);
                }
                str = first + "." + last;
            }
        }
        return str;
    }

    public static String realSub(String str, int start, int end) {
        if (str == null) {
            return null;
        }
        int max = end - start;
        StringBuilder back = new StringBuilder();
        int length = 0;
        int i = 0;
        char[] chars = str.toCharArray();
        for (int j = start; j < chars.length; j++) {
            char aChar = chars[j];
            if (isChinese(aChar)) {
                length += 2;
            } else {
                length++;
            }
            if (length > max) {
                return back.toString();
            } else {
                back.append(aChar);
            }
        }
        return back.toString();
    }

    public static String number(String number) {
        if (number == null) {
            return null;
        }
        String[] numbers = new String[]{"①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"};
        for (int i = 0; i < numbers.length; i++) {
            String num = numbers[i];
            number = number.replaceAll((i + 1) + "", num);
        }
        return number;
    }

    private static boolean isChinese(char c) {
        return c >= 0x4E00 && c <= 0x9FA5;
    }

    public static Integer realLength(String str) {
        if (str == null) {
            return 0;
        }
        int length = 0;
        char[] chars = str.toCharArray();
        for (Character aChar : chars) {
            if (isChinese(aChar)) {
                length += 2;
            } else {
                length++;
            }
        }
        return length;
    }

    public static String join(String[] array, String spe) {
        if (array == null || array.length == 0) {
            return null;
        }
        StringBuilder join = new StringBuilder();
        for (String str : array) {
            join.append(str).append(spe);
        }
        join.delete(join.length() - 1, join.length());
        return join.toString();
    }

    public static String addZero(String str, Integer length) {
        if (str.length() < length) {
            int zeroCount = length - str.length();
            StringBuilder strBuilder = new StringBuilder(str);
            for (int i = 0; i < zeroCount; i++) {
                strBuilder.insert(0, "0");
            }
            str = strBuilder.toString();
        }
        return str;
    }

    public static boolean bool(String str) {
        if (isBlank(str)) {
            return false;
        }
        return !"0".equals(str);
    }

}
