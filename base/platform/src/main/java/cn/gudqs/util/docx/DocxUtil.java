package cn.gudqs.util.docx;

import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.config.Configure;
import org.apache.poi.xwpf.usermodel.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * @author wq
 * @date 2019-05-07
 * @description docx 入口
 */
public class DocxUtil {

    private static final String PARAM_FIELD = "parametersMap";
    private static final String FOREACH_FIELD = "##{foreach:";
    private static final String GRAMER_PREFIX = "{";

    public static XWPFDocument getDocByTemplate(InputStream template, Map<String, Object> dataMap) throws IOException {
        assert template != null;
        XWPFDocument document = new XWPFDocument(template);
        replaceDocument(dataMap, document);
        return document;
    }

    public static XWPFDocument getDoc2(InputStream template, Map<String, Object> dataMap) {
        Configure.ConfigureBuilder builder = Configure.newBuilder();
        builder.addPlugin('$', new ForeachRenderPolicy());
        builder.buildGramer("${", "}");
        XWPFTemplate render = XWPFTemplate.compile(template, builder.build()).render(dataMap);
        return render.getXWPFDocument();
    }

    @SuppressWarnings({"AlibabaMethodTooLong", "unchecked"})
    private static void replaceDocument(Map<String, Object> dataMap, XWPFDocument document) {

        if (!dataMap.containsKey(PARAM_FIELD)) {
            System.out.println("数据源错误--数据源(parametersMap)缺失");
            return;
        }
        Object parametersMap0 = dataMap.get(PARAM_FIELD);
        Map<String, Object> parametersMap = (Map<String, Object>) parametersMap0;

        // 所有对象（段落+表格）
        List<IBodyElement> bodyElements = document.getBodyElements();
        // 标记模板文件（段落+表格）总个数
        int templateBodySize = bodyElements.size();

        // 当前操作表格对象的索引
        int curT = 0;
        // 当前操作段落对象的索引
        int curP = 0;
        for (IBodyElement body : bodyElements) {
            if (BodyElementType.TABLE.equals(body.getElementType())) {
                // 处理表格
                List<XWPFTable> tables = body.getBody().getTables();
                XWPFTable table = tables.get(curT);
                if (table != null) {
                    dealTable(table, dataMap, parametersMap, document);
                }
            } else if (BodyElementType.PARAGRAPH.equals(body.getElementType())) {
                // 处理段落
                XWPFParagraph ph = body.getBody().getParagraphArray(curP);
                if (ph != null) {
                    addParagraphInDocFooter(ph, parametersMap, document);
                    curP++;
                }
            }

        }
        // 处理完毕模板，删除文本中的模板内容
        for (int a = 0; a < templateBodySize; a++) {
            document.removeBodyElement(0);
        }

    }

    @SuppressWarnings("unchecked")
    private static void dealTable(XWPFTable table, Map<String, Object> dataMap, Map<String, Object> parametersMap, XWPFDocument document) {
        String tableText = table.getText();
        if (tableText.contains(FOREACH_FIELD)) {
            List<XWPFTableRow> rows = table.getRows();
            for (int i = 0; i < rows.size(); i++) {
                XWPFTableRow tableRow = rows.get(i);
                for (XWPFTableCell tableCell : tableRow.getTableCells()) {
                    String text = tableCell.getText();
                    boolean foreachRow = text.startsWith(FOREACH_FIELD) && text.endsWith("}##");
                    if (foreachRow) {
                        String key = text.substring(3, text.length() - 3).split(":")[1];
                        List<Map<String, Object>> nowList = (List<Map<String, Object>>) dataMap.get(key);
                        dealForeach(document, table, nowList, parametersMap, i);
                    }
                }
            }
        } else if (tableText.contains(GRAMER_PREFIX)) {
            XWPFTable newTable = getTable(table, document);
            DocxUtils.replaceTable(newTable, parametersMap);
        } else {
            getTable(table, document);
        }
    }

    private static void dealForeach(XWPFDocument document, XWPFTable templateTable, List<Map<String, Object>> list, Map<String, Object> parametersMap, int tagRowsIndex) {
        // 表格表格内部行循环
        // 创建新表格,默认一行一列
        XWPFTable newCreateTable = document.createTable();
        // 获取模板表格所有行
        List<XWPFTableRow> templateTableRows = templateTable.getRows();

        /* 复制模板行和标签行之前的行 */
        for (int i = 1; i < tagRowsIndex; i++) {
            XWPFTableRow newCreateRow = newCreateTable.createRow();
            // 复制行
            DocxUtils.copyTableRow(newCreateRow, templateTableRows.get(i));
            // 处理不循环标签的替换
            DocxUtils.replaceTableRow(newCreateRow, parametersMap);
        }

        /* 循环生成模板行 */
        // 获取到模板行
        int tempRowIndex = tagRowsIndex + 1;
        XWPFTableRow tempRow = templateTableRows.get(tempRowIndex);
        for (Map<String, Object> stringObjectMap : list) {
            XWPFTableRow newCreateRow = newCreateTable.createRow();
            // 复制模板行
            DocxUtils.copyTableRow(newCreateRow, tempRow);
            // 处理标签替换
            DocxUtils.replaceTableRow(newCreateRow, stringObjectMap);
        }

        /* 复制模板行和标签行之后的行 */
        int afterForeachIndex = tagRowsIndex + 2;
        for (int i = afterForeachIndex; i < templateTableRows.size(); i++) {
            XWPFTableRow newCreateRow = newCreateTable.createRow();
            // 复制行
            DocxUtils.copyTableRow(newCreateRow, templateTableRows.get(i));
            // 处理不循环标签的替换
            DocxUtils.replaceTableRow(newCreateRow, parametersMap);
        }
        // 移除多出来的第一行
        newCreateTable.removeRow(0);
        // 添加回车换行
        document.createParagraph();

    }

    private static XWPFTable getTable(XWPFTable templateTable, XWPFDocument document) {
        List<XWPFTableRow> templateTableRows = templateTable.getRows();
        // 创建新表格,默认一行一列
        XWPFTable newCreateTable = document.createTable();
        for (XWPFTableRow templateTableRow : templateTableRows) {
            XWPFTableRow newCreateRow = newCreateTable.createRow();
            // 复制模板行文本和样式到新行
            DocxUtils.copyTableRow(newCreateRow, templateTableRow);
        }
        // 移除多出来的第一行
        newCreateTable.removeRow(0);
        // 添加回车换行
        document.createParagraph();
        return newCreateTable;
    }

    private static void addParagraphInDocFooter(XWPFParagraph templateParagraph, Map<String, Object> parametersMap, XWPFDocument document) {
        XWPFParagraph createParagraph = document.createParagraph();
        DocxUtils.copyParagraph(createParagraph, templateParagraph);
        DocxUtils.replaceParagraph(createParagraph, parametersMap);
    }
}