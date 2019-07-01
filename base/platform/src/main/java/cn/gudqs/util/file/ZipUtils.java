package cn.gudqs.util.file;

import cn.gudqs.util.LoggerUtil;
import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author wq
 * @date 2019-05-13
 * @description 压缩多个文件
 */
public class ZipUtils {

    public static void writeZip(OutputStream outputStream, List<File> files) throws FileNotFoundException {
        List<InputStream> inputStreams = new ArrayList<>();
        List<String> fileNames = new ArrayList<>();
        for (File file : files) {
            inputStreams.add(new FileInputStream(file));
            String name = file.getName();
            fileNames.add(name);
        }
        writeZip(outputStream, inputStreams, fileNames);
    }

    public static void writeZip(OutputStream outputStream, List<InputStream> inputStreams, List<String> fileNames) {
        try {
            ZipOutputStream out = new ZipOutputStream(outputStream);
            for (int i = 0; i < inputStreams.size(); i++) {
                InputStream inputStream = inputStreams.get(i);
                String fileName = fileNames.get(i);
                LoggerUtil.onlyFile("zip: " + fileName);
                out.putNextEntry(new ZipEntry(fileName));
                out.setEncoding("UTF-8");

                byte[] buffer = new byte[1024];
                int len;
                // 读入需要下载的文件的内容，打包到zip文件

                while ((len = inputStream.read(buffer)) > 0) {
                    out.write(buffer, 0, len);
                }
                out.closeEntry();
                inputStream.close();
            }
            out.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
