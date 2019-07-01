package cn.gudqs.util.docx;

import org.apache.poi.xwpf.usermodel.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author wq
 * @date 2019-05-07
 * @description docx 通用方法
 */
@SuppressWarnings("WeakerAccess")
public class DocxUtils {

    public static void copyParagraph(XWPFParagraph target, XWPFParagraph source) {
        // 设置段落样式
        target.getCTP().setPPr(source.getCTP().getPPr());
        // 移除原始内容
        for (int pos = 0; pos < target.getRuns().size(); pos++) {
            target.removeRun(pos);
        }
        // 添加Run标签
        for (XWPFRun sourceRun : source.getRuns()) {
            XWPFRun targetRun = target.createRun();
            copyRun(targetRun, sourceRun);
        }
    }

    public static void replaceParagraph(XWPFParagraph xWPFParagraph, Map<String, Object> parametersMap) {
        //正则匹配字符串{****}
        replaceParagraph(xWPFParagraph, parametersMap, "\\{.+?\\}");
    }

    public static void replaceParagraph(XWPFParagraph xWPFParagraph, Map<String, Object> parametersMap, String regEx) {
        List<XWPFRun> runs = xWPFParagraph.getRuns();
        String xWPFParagraphText = xWPFParagraph.getText();
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(xWPFParagraphText);

        if (matcher.find()) {
            // 查找到有标签才执行替换
            // 标签开始run位置
            int beginRunIndex = xWPFParagraph.searchText("{", new PositionInParagraph()).getBeginRun();
            // 结束标签
            int endRunIndex = xWPFParagraph.searchText("}", new PositionInParagraph()).getEndRun();
            StringBuilder key = new StringBuilder();

            if (beginRunIndex == endRunIndex) {
                // {**}在一个run标签内
                dealTheSameRun(xWPFParagraph, parametersMap, runs, beginRunIndex, key);

            } else {
                // {**}被分成多个run

                //先处理起始run标签,取得第一个{key}值
                XWPFRun beginRun = runs.get(beginRunIndex);
                String beginRunText = beginRun.text();
                int beginIndex = beginRunText.indexOf("{");
                if (beginRunText.length() > 1) {
                    key.append(beginRunText.substring(beginIndex + 1));
                }
                //需要移除的run
                ArrayList<Integer> removeRunList = new ArrayList<>();
                //处理中间的run
                for (int i = beginRunIndex + 1; i < endRunIndex; i++) {
                    XWPFRun run = runs.get(i);
                    String runText = run.text();
                    key.append(runText);
                    removeRunList.add(i);
                }

                // 获取endRun中的key值
                XWPFRun endRun = runs.get(endRunIndex);
                String endRunText = endRun.text();
                int endIndex = endRunText.indexOf("}");
                //run中**}或者**}**
                if (endRunText.length() > 1 && endIndex != 0) {
                    key.append(endRunText, 0, endIndex);
                }
                String realMapKey = key.toString();


                //*******************************************************************
                //取得key值后替换标签
                replaceRunByRealKey(xWPFParagraph, parametersMap, runs, beginRunIndex, endRunIndex, beginRun, beginRunText, removeRunList, endRun, endRunText, realMapKey);

            }
            replaceParagraph(xWPFParagraph, parametersMap);
        }
    }

    private static void replaceRunByRealKey(XWPFParagraph xWPFParagraph, Map<String, Object> parametersMap, List<XWPFRun> runs, int beginRunIndex, int endRunIndex, XWPFRun beginRun, String beginRunText, ArrayList<Integer> removeRunList, XWPFRun endRun, String endRunText, String realMapKey) {
        //先处理开始标签
        boolean beginRunLengthIsTwo = beginRunText.length() == 2;
        if (beginRunLengthIsTwo) {
            // run标签内文本{
            emptyRun(xWPFParagraph, beginRunIndex, beginRun, getValueByKey(realMapKey, parametersMap));
        } else {
            // 该run标签为**{**或者 {** ，替换key后，还需要加上原始key前的文本
            XWPFRun insertNewRun = xWPFParagraph.insertNewRun(beginRunIndex);
            insertNewRun.getCTR().setRPr(beginRun.getCTR().getRPr());
            // 设置文本
            String textString = beginRunText.substring(0, beginRunText.indexOf("{")) + getValueByKey(realMapKey, parametersMap);
            insertNewRun.setText(textString);
            //移除原始的run
            xWPFParagraph.removeRun(beginRunIndex + 1);
        }

        //处理结束标签
        if (endRunText.length() == 1) {
            // run标签内文本只有}
            emptyRun(xWPFParagraph, endRunIndex, endRun, "");

        } else {
            // 该run标签为**}**或者 }** 或者**}，替换key后，还需要加上原始key后的文本
            XWPFRun insertNewRun = xWPFParagraph.insertNewRun(endRunIndex);
            insertNewRun.getCTR().setRPr(endRun.getCTR().getRPr());
            // 设置文本
            String textString = endRunText.substring(endRunText.indexOf("}") + 1);
            insertNewRun.setText(textString);
            //移除原始的run
            xWPFParagraph.removeRun(endRunIndex + 1);
        }

        //处理中间的run标签
        for (Integer integer : removeRunList) {
            //原始run
            XWPFRun xWPFRun = runs.get(integer);
            emptyRun(xWPFParagraph, integer, xWPFRun, "");
        }
    }

    private static void emptyRun(XWPFParagraph xWPFParagraph, Integer integer, XWPFRun xWPFRun, String s) {
        XWPFRun insertNewRun = xWPFParagraph.insertNewRun(integer);
        insertNewRun.getCTR().setRPr(xWPFRun.getCTR().getRPr());
        insertNewRun.setText(s);
        //移除原始的run
        xWPFParagraph.removeRun(integer + 1);
    }

    private static void dealTheSameRun(XWPFParagraph xWPFParagraph, Map<String, Object> parametersMap, List<XWPFRun> runs, int beginRunIndex, StringBuilder key) {
        XWPFRun beginRun = runs.get(beginRunIndex);
        String beginRunText = beginRun.text();

        int beginIndex = beginRunText.indexOf("{");
        int endIndex = beginRunText.indexOf("}");
        int length = beginRunText.length();

        if (beginIndex == 0 && endIndex == length - 1) {
            // 该run标签只有{**}
            XWPFRun insertNewRun = xWPFParagraph.insertNewRun(beginRunIndex);
            insertNewRun.getCTR().setRPr(beginRun.getCTR().getRPr());
            // 设置文本
            key.append(beginRunText, 1, endIndex);
            insertNewRun.setText(getValueByKey(key.toString(), parametersMap));
            xWPFParagraph.removeRun(beginRunIndex + 1);
        } else {
            // 该run标签为**{**}** 或者 **{**} 或者{**}**，替换key后，还需要加上原始key前后的文本
            XWPFRun insertNewRun = xWPFParagraph.insertNewRun(beginRunIndex);
            insertNewRun.getCTR().setRPr(beginRun.getCTR().getRPr());
            // 设置文本
            key.append(beginRunText, beginRunText.indexOf("{") + 1, beginRunText.indexOf("}"));
            String textString = beginRunText.substring(0, beginIndex) +
                    getValueByKey(key.toString(), parametersMap) +
                    beginRunText.substring(endIndex + 1);
            insertNewRun.setText(textString);
            xWPFParagraph.removeRun(beginRunIndex + 1);
        }
    }

    /**
     * 复制表格行XWPFTableRow格式
     *
     * @param target 待修改格式的XWPFTableRow
     * @param source 模板XWPFTableRow
     */
    public static void copyTableRow(XWPFTableRow target, XWPFTableRow source, int startCell) {
        // 模板行的列数
        int tempRowCellsize = source.getTableCells().size() - target.getTableCells().size();
        for (int i = 0; i < tempRowCellsize; i++) {
            // 为新添加的行添加与模板表格对应行行相同个数的单元格
            target.addNewTableCell();
        }
        // 复制样式
        target.getCtRow().setTrPr(source.getCtRow().getTrPr());
        // 复制单元格
        for (int i = startCell; i < target.getTableCells().size(); i++) {
            copyTableCell(target.getCell(i), source.getCell(i));
        }
    }

    public static void copyTableRow(XWPFTableRow target, XWPFTableRow source) {
        copyTableRow(target, source, 0);
    }

    /**
     * 复制文本节点run
     *
     * @param newRun      新创建的的文本节点
     * @param templateRun 模板文本节点
     * @author Juveniless
     * @date 2017年11月27日 下午3:47:17
     */
    public static void copyRun(XWPFRun newRun, XWPFRun templateRun) {
        newRun.getCTR().setRPr(templateRun.getCTR().getRPr());
        // 设置文本
        newRun.setText(templateRun.text());
    }

    /**
     * 根据参数parametersMap对表格的一行进行标签的替换
     *
     * @param tableRow      表格行
     * @param parametersMap 参数map
     * @author Juveniless
     * @date 2017年11月23日 下午2:09:24
     */
    public static void replaceTableRow(XWPFTableRow tableRow, Map<String, Object> parametersMap, int cellStartIndex) {
        List<XWPFTableCell> tableCells = tableRow.getTableCells();
        for (int i = cellStartIndex; i < tableCells.size(); i++) {
            XWPFTableCell xWPFTableCell = tableCells.get(i);
            List<XWPFParagraph> paragraphs = xWPFTableCell.getParagraphs();
            for (XWPFParagraph xwpfParagraph : paragraphs) {
                replaceParagraph(xwpfParagraph, parametersMap);
            }
        }
    }

    /**
     * 根据map替换表格中的{key}标签
     *
     * @param xwpfTable     e
     * @param parametersMap e
     * @author Juveniless
     * @date 2017年12月4日 下午2:47:36
     */
    public static void replaceTable(XWPFTable xwpfTable, Map<String, Object> parametersMap) {
        List<XWPFTableRow> rows = xwpfTable.getRows();
        for (XWPFTableRow xWPFTableRow : rows) {
            replaceTableRow(xWPFTableRow, parametersMap);
        }
    }

    /**
     * 复制单元格XWPFTableCell格式
     *
     * @param newTableCell      新创建的的单元格
     * @param templateTableCell 模板单元格
     * @author Juveniless
     * @date 2017年11月27日 下午3:41:02
     */
    public static void copyTableCell(XWPFTableCell newTableCell, XWPFTableCell templateTableCell) {
        // 列属性
        newTableCell.getCTTc().setTcPr(templateTableCell.getCTTc().getTcPr());
        // 删除目标 targetCell 所有文本段落
        for (int pos = 0; pos < newTableCell.getParagraphs().size(); pos++) {
            newTableCell.removeParagraph(pos);
        }
        // 添加新文本段落
        for (XWPFParagraph sp : templateTableCell.getParagraphs()) {
            XWPFParagraph targetP = newTableCell.addParagraph();
            copyParagraph(targetP, sp);
        }
    }

    public static void replaceTableRow(XWPFTableRow tableRow, Map<String, Object> dataMap) {
        replaceTableRow(tableRow, dataMap, 0);
    }

    public static String getValueByKey(String key, Map<String, Object> map) {
        String returnValue = "";
        if (key != null) {
            try {
                returnValue = map.get(key) != null ? map.get(key).toString() : "";
            } catch (Exception e) {
                // TODO: handle exception
                System.out.println("key:" + key + "***" + e);
                returnValue = "";
            }

        }
        return returnValue;
    }
}
