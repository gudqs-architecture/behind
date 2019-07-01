package cn.gudqs.util.docx;

import com.deepoove.poi.NiceXWPFDocument;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.policy.RenderPolicyWithTagName;
import com.deepoove.poi.template.ElementTemplate;
import com.deepoove.poi.template.run.RunTemplate;
import cn.gudqs.util.JsonUtils;
import org.apache.poi.xwpf.usermodel.*;
import org.apache.xmlbeans.XmlCursor;
import org.apache.xmlbeans.XmlObject;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTbl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author wq
 * @date 2019-05-07
 * @description qing-yuan-api
 */
public class ForeachRenderPolicy implements RenderPolicyWithTagName {

    @SuppressWarnings("unchecked")
    public void render(XWPFTable table, Object data, String tagName) {
        if (data == null) {
            return;
        }
        int cellStartIndex = 0;
        int rowStartIndex = 0;
        List<XWPFTableRow> rows = table.getRows();
        for (int rowIndex = 0; rowIndex < rows.size(); rowIndex++) {
            XWPFTableRow row = rows.get(rowIndex);
            List<XWPFTableCell> tableCells = row.getTableCells();
            for (int cellIndex = 0; cellIndex < tableCells.size(); cellIndex++) {
                XWPFTableCell cell = tableCells.get(cellIndex);
                String text = cell.getText();
                boolean isRowStart = text.contains("{" + tagName + "-row}");
                if (isRowStart) {
                    rowStartIndex = rowIndex + 1;
                }
                boolean isCellStart = text.contains("{" + tagName + "-cell}");
                if (isCellStart) {
                    cellStartIndex = cellIndex;
                }
                if (isRowStart || isCellStart) {
                    List<XWPFParagraph> paragraphs = cell.getParagraphs();
                    for (XWPFParagraph paragraph : paragraphs) {
                        DocxUtils.replaceParagraph(paragraph, new HashMap<>(1));
                    }
                }
            }
        }
        List dataList;
        if (data instanceof List) {
            dataList = (List) data;
        } else {
            dataList = new ArrayList<>(1);
        }
        XWPFTableRow sourceTableRow = table.getRow(rowStartIndex);
        for (int i = 0; i < dataList.size(); i++) {
            Map<String, Object> dataMap = JsonUtils.getMap(JsonUtils.getJsonString(dataList.get(i)));
            XWPFTableRow tableRow = table.insertNewTableRow(rowStartIndex + i + 1);
            DocxUtils.copyTableRow(tableRow, sourceTableRow, cellStartIndex);
            DocxUtils.replaceTableRow(tableRow, dataMap);
        }
        table.removeRow(rowStartIndex);

    }

    @Override
    public void render(ElementTemplate eleTemplate, Object data, XWPFTemplate template) {
        render(eleTemplate, data, template, null);
    }

    @Override
    public void render(ElementTemplate eleTemplate, Object data, XWPFTemplate template, String tagName) {
        NiceXWPFDocument doc = template.getXWPFDocument();
        RunTemplate runTemplate = (RunTemplate) eleTemplate;
        XWPFRun run = runTemplate.getRun();
        run.setText("", 0);
        try {
            // w:tbl-w:tr-w:tc-w:p-w:tr
            XmlCursor newCursor = ((XWPFParagraph) run.getParent()).getCTP().newCursor();
            newCursor.toParent();
            newCursor.toParent();
            newCursor.toParent();
            XmlObject object = newCursor.getObject();
            XWPFTable table = doc.getTableByCTTbl((CTTbl) object);
            render(table, data, tagName);
        } catch (Exception e) {
            logger.error("dynamic table error:" + e.getMessage(), e);
        }
    }
}
