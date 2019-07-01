package cn.gudqs.util;

import cn.gudqs.exception.CustomException;
import org.apache.logging.log4j.util.Strings;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author wq
 * @date 2018/9/24
 * @description seo-new
 */
public class DateUtils {

    public static final String FORMAT_19 = "yyyy-MM-dd HH:mm:ss";
    public static final String FORMAT_16 = "yyyy-MM-dd HH:mm";
    public static final String FORMAT_14 = "yyyyMMddHHmmss";
    public static final String FORMAT_10 = "yyyy-MM-dd";

    public static String format(Date d) {
        return format(d, FORMAT_19);
    }

    public static String format(Date d, String fmt) {
        if (d == null) {
            throw new CustomException("format data error , date is null!");
        }
        if (Strings.isBlank(fmt)) {
            fmt = FORMAT_19;
        }
        return new SimpleDateFormat(fmt).format(d);
    }

    public static String format(String d, String fmt) throws ParseException {
        return format(d, fmt, FORMAT_19);
    }

    public static String format(String d, String fmt, String oldFmt) throws ParseException {
        if (d == null) {
            throw new CustomException("format data error , date is null!");
        }
        if (Strings.isBlank(fmt)) {
            fmt = FORMAT_19;
        }
        if (Strings.isBlank(oldFmt)) {
            oldFmt = FORMAT_19;
        }
        Date d2 = parse(d, oldFmt);
        return new SimpleDateFormat(fmt).format(d2);
    }

    public static Date addTimes(Date date, Long times) {
        return new Date(date.getTime() + times);
    }

    public static Date addDays(Date date, Integer day) {
        return addTimes(date, day * (1000 * 60 * 60 * 24L));
    }

    public static Date addMonths(Date date, Integer month) {
        return addCalendar(date, month, Calendar.MONTH);
    }

    public static Date addYears(Date date, Integer year) {
        return addCalendar(date, year, Calendar.YEAR);
    }

    private static Date addCalendar(Date date, Integer val, int field) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(field, calendar.get(field) + val);
        return calendar.getTime();
    }

    public static Date parse(String dateStr) throws ParseException {
        if (dateStr == null) {
            return null;
        }
        if (dateStr.length() == 10) {
            return parse(dateStr, FORMAT_10);
        }
        if (dateStr.length() == 16) {
            return parse(dateStr, FORMAT_16);
        }
        if (dateStr.length() == 19) {
            return parse(dateStr, FORMAT_19);
        }
        if (dateStr.length() == 14) {
            return parse(dateStr, FORMAT_14);
        }
        return null;
    }

    public static Date parse(String dateStr, String fmt) throws ParseException {
        if (Strings.isEmpty(fmt)) {
            fmt = FORMAT_19;
        }
        return new SimpleDateFormat(fmt).parse(dateStr);
    }

    public static Date change(Date date, String toFmt) throws ParseException {
        if (Strings.isEmpty(toFmt)) {
            toFmt = FORMAT_19;
        }
        String format = format(date, toFmt);
        return parse(format, toFmt);
    }

    public static String getNowDate() {
        return getNowDate19();
    }

    public static String getNowDate(String format) {
        return format(new Date(), format);
    }

    public static String getNowDate19() {
        return getNowDate(FORMAT_19);
    }

    public static String getNowDate16() {
        return getNowDate(FORMAT_16);
    }

    public static String getNowDate10() {
        return getNowDate(FORMAT_10);
    }

    public static Date getNextTime(int minite) {
        return getNextTime(minite, true);
    }

    public static  Date getNextTime(int minite, boolean sendOnDeepNight) {
        Date now = new Date();
        Date nextTime = DateUtils.addTimes(now, 1000 * 60L * minite);
        if (!sendOnDeepNight) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(nextTime);
            int hours = calendar.get(Calendar.HOUR_OF_DAY);
            if (hours < 9 || hours > 22) {
                if (hours < 9) {
                    calendar.set(Calendar.HOUR_OF_DAY, 9);
                } else {
                    calendar.set(Calendar.HOUR_OF_DAY, 9);
                    calendar.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH) + 1);
                }
                nextTime = calendar.getTime();
            }
        }
        return nextTime;
    }

    public static void main(String[] args) {
        System.out.println(DateUtils.format(getNextTime(30)));
    }

}
