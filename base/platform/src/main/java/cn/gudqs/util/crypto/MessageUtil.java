package cn.gudqs.util.crypto;

import cn.gudqs.util.StringUtil;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * @author wq
 */
public class MessageUtil {

    private static Pattern xml = Pattern.compile("<!\\[CDATA\\[.*?]]>");

    public static String messageToXML(Map<String, String> map) {
        return messageToXML(map, "xml");
    }

    public static String messageToXML(Map<String, String> map, String customRootName) {
        String xmlResult;
        if (StringUtil.isBlank(customRootName)) {
            customRootName = "xml";
        }
        StringBuilder sb = new StringBuilder();
        sb.append("<").append(customRootName).append(">");
        for (String key : map.keySet()) {
            String content = map.get(key);
            String value = "<![CDATA[" + content + "]]>";
            if (xml.matcher(content).find()) {
                value = content;
            }
            sb.append("<").append(key).append(">").append(value).append("</").append(key).append(">");
            sb.append("\n");
        }
        sb.append("</").append(customRootName).append(">");
        xmlResult = sb.toString();
        return xmlResult;
    }

    public static Map<String, String> xml2Map(String result) throws DocumentException {
        Map<String, String> map = new HashMap<>(10);
        InputStream in = new ByteArrayInputStream(result.getBytes());

        SAXReader reader = new SAXReader();
        Document document = reader.read(in);

        Element root = document.getRootElement();

        @SuppressWarnings("unchecked")
        List<Element> elementList = root.elements();
        for (Element element : elementList) {
            map.put(element.getName(), element.getText());
        }
        return map;
    }

}