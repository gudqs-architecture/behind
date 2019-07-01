package cn.gudqs.util.file;

import cn.gudqs.base.MapBean;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jboss.logging.Logger;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * @author wq
 * @date 2019-01-18
 * @description jd-plus
 */
public class ExcelUtil {

    private static Logger logger = Logger.getLogger(ExcelUtil.class);

    public static boolean isExcel2003(String filePath) {
        return filePath.matches("^.+\\.(?i)(xls)$");
    }

    public static boolean isExcel2007(String filePath) {
        return filePath.matches("^.+\\.(?i)(xlsx)$");
    }

    public static List<MapBean> read(File file) throws Exception {
        return read(file, 0, 0, 0, false);
    }

    public static List<MapBean> read(File file, boolean readKey) throws Exception {
        return read(file, 0, 0, 0, readKey);
    }

    public static List<MapBean> read(String path) throws Exception {
        return read(path, 0, 0, 0, false);
    }

    public static List<MapBean> read(String path, boolean readKey) throws Exception {
        return read(path, 0, 0, 0, readKey);
    }

    public static List<MapBean> read(String path, int sheetIndex, int startRow, int startCell, boolean readKey) throws Exception {
        File file = new File(path);
        return read(file, sheetIndex, startRow, startCell, readKey);
    }

    public static List<MapBean> read(File file, int sheetIndex, int startRow, int startCell, boolean readKey) throws Exception {
        Workbook wb;
        List<MapBean> excelData = new ArrayList<>();
        if (ExcelUtil.isExcel2007(file.getPath())) {
            wb = new XSSFWorkbook(new FileInputStream(file));
        } else {
            wb = new HSSFWorkbook(new FileInputStream(file));
        }

        //获取第一张表
        MapBean excelKey = new MapBean();
        Sheet sheet = wb.getSheetAt(sheetIndex);
        if (readKey) {
            Row row = sheet.getRow(startRow);
            List<String> list = new ArrayList<>(20);
            for (int j = startCell; j < row.getLastCellNum(); j++) {
                Cell cell = row.getCell(j);
                if (cell != null) {
                    String cellValue = getCellValue(cell).toString();
                    excelKey.put("key-" + j, cellValue);
                    logger.info("excel read key--> key:val" + j + ":" + cellValue);
                    list.add(cellValue);
                } else {
                    logger.info("excel read key--> cell is null-" + j);
                }
            }
            MapBean keyList = new MapBean();
            keyList.put("excel-first-row", list);
            excelData.add(keyList);
            startRow++;
        }
        int lastRowNum = sheet.getLastRowNum();
        logger.info("excel read--> last Row: " + lastRowNum);
        for (int i = startRow; i < lastRowNum; i++) {
            //获取索引为i的行，以0开始
            Row row = sheet.getRow(i);
            if (row != null) {
                //获取第i行的索引为0的单元格数据
                MapBean rowData = new MapBean();
                short lastCellNum = row.getLastCellNum();
                for (int j = startCell; j < lastCellNum; j++) {
                    Cell cell = row.getCell(j);
                    if (cell != null) {
                        Object cellValue = getCellValue(cell);
                        String key = "key-" + j;
                        boolean hasNameKey = excelKey.containsKey(key);
                        if (hasNameKey) {
                            key = excelKey.getString(key);
                        }
                        rowData.put(key, cellValue);
                    } else {
                        logger.debug("excel read--> cell is null-" + j);
                    }
                }
                excelData.add(rowData);
            } else {
                logger.info("excel read--> row is null-" + i);
            }
        }

        wb.close();
        return excelData;
    }

    private static Object getCellValue(Cell cell) {
        CellType cellTypeEnum = cell.getCellTypeEnum();
        Object cellValue = null;
        if (cellTypeEnum == CellType.STRING) {
            cellValue = cell.getStringCellValue();
        } else if (cellTypeEnum == CellType.NUMERIC) {
            cellValue = cell.getNumericCellValue();
        } else if (cellTypeEnum == CellType.BOOLEAN) {
            cellValue = cell.getBooleanCellValue();
        }
        return cellValue;
    }


}
