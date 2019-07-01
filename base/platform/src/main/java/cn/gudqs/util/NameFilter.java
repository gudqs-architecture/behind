package cn.gudqs.util;

import org.jboss.logging.Logger;

/**
 * @author wq
 * @date 2018/9/21
 * @description NameFilter
 */
public class NameFilter {

    private static Logger logger = Logger.getLogger(NameFilter.class);

    public static String filterEmoji(String nickName) {
        logger.debug("filterEmoji--> name: " + nickName);
        if (nickName == null) {
            return null;
        }
        return nickName.replaceAll("[^\u4E00-\u9FA5A-z0-9①②③④⑤⑥⑦⑧⑨。？！，、：~@#.?!,～＠$￥฿€℃℉″′∶∴∵∷＃%﹪&＆*＊+＋-－=＝<﹤^…`·¦‖︴/-{}()（）【】《》«»〖〗「」『』〈〉＜＞﹝﹞“”'‘’－\\[\\]\\- \"]", " ");
    }

    public static String shieldName(String nickName) {
        logger.debug("shieldName--> name: " + nickName);
        if (nickName == null) {
            return null;
        }
        if (nickName.length() >= 1 && nickName.length() <= 2) {
            nickName = nickName.substring(0, 1) + "*";
        } else {
            String substring = nickName.substring(nickName.length() - 1);
            if (nickName.length() > 2 && nickName.length() <= 5) {
                nickName = nickName.substring(0, 1) + "**" + substring;
            } else {
                nickName = nickName.substring(0, 2) + "**" + substring;
            }
        }
        logger.debug("shieldName--> after: " + nickName);
        return nickName;
    }

    public static String shieldPhone(String phone) {
        return shieldPhone(phone, true);
    }

    public static String shieldPhone(String phone, boolean showFirst) {
        return shieldPhone(phone, showFirst, "_");
    }

    public static String shieldPhone(String phone, boolean showFirst, String shieldChar) {
        if (phone == null) {
            return null;
        }
        String back;
        if (phone.length() < 11) {
            back = phone.substring(0, 3) + shieldChar + shieldChar + shieldChar;
        } else {
            String lastFour = phone.substring(phone.length() - 4);
            String first = shieldChar + shieldChar + shieldChar;
            if (showFirst) {
                first = phone.substring(0, 3);
            }
            back = first + shieldChar + shieldChar + shieldChar + shieldChar + lastFour;
        }
        return back;
    }

}
