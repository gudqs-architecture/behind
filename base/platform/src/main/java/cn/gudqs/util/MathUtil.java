package cn.gudqs.util;

import java.text.DecimalFormat;
import java.util.Random;
import java.util.regex.Pattern;

/**
 * @author wq
 * @date 2018/10/23
 * @description jd-plus
 */
public class MathUtil {

    public static final float ONE_HUNDRED = 100f;
    private static Pattern floatPattern = Pattern.compile("^[-+]?[.\\d]*$");
    private static Pattern intPattern = Pattern.compile("^[-+]?[\\d]*$");

    public static boolean isDouble(String str) {
        if (StringUtil.isBlank(str)) {
            return false;
        }
        return floatPattern.matcher(str).matches();
    }

    public static Double parseDouble(Object string) {
        if (string == null) {
            return null;
        }
        String str = string.toString();
        if (isDouble(str)) {
            return Double.parseDouble(str);
        } else {
            return null;
        }
    }

    public static Float parseFloat(Object string) {
        if (string == null) {
            return null;
        }
        String str = string.toString();
        if (isDouble(str)) {
            return Float.parseFloat(str);
        } else {
            return null;
        }
    }

    public static Float getYuanFromFen(Integer fen) {
        if (fen == null) {
            return null;
        }
        return fen / 100f;
    }

    public static Integer parseInt(Object string) {
        if (string == null) {
            return null;
        }
        String str = string.toString();
        if (isInt(str)) {
            return Integer.parseInt(str);
        } else {
            return null;
        }
    }

    public static boolean isInt(String str) {
        if (StringUtil.isBlank(str)) {
            return false;
        }
        return intPattern.matcher(str).matches();
    }

    public static Integer randomInt(int min, int max) {
        Integer random = new Random().nextInt(max - min);
        return random + min;
    }

    public static String toFixed(Number number, Integer keep) {
        StringBuilder keepPattern = new StringBuilder("0.");
        for (int i = 0; i < keep; i++) {
            keepPattern.append("0");
        }
        DecimalFormat decimalFormat = new DecimalFormat(keepPattern.toString());
        return decimalFormat.format(number);
    }

    public static Double randomDouble(double min, double max) {
        return Math.random() * (max - min) + min;
    }

}
