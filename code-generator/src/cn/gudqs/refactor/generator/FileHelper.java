package cn.gudqs.refactor.generator;

import java.io.*;
import java.nio.charset.StandardCharsets;

/**
 * @author wq
 * @date 2018/5/14
 */
public class FileHelper {

    static String readFile(String path) throws IOException {
        StringBuilder back = new StringBuilder();
        File file = new File(path);
        if (file.exists() && !file.isDirectory()) {
            BufferedReader br=new BufferedReader(new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8));
            char[] buff = new char[1024];
            int len = -1;
            while ((len = br.read(buff)) != -1) {
                back.append(new String(buff, 0, len));
            }
            br.close();
        }
        return back.toString();
    }

    static boolean writeFile(String content, File dir, File file) throws IOException {
        if (!dir.exists()) {
            if (!dir.mkdirs()) {
                System.out.println("创建文件夹失败");
            }
        }
        if (file.exists()) {
            if (!"true".equals(Main.OVERRIDE)) {
                System.out.println("不能覆盖文件" + file.getPath());
                return false;
            }else{
                System.out.println("覆盖文件-->" + file.getPath());
            }
        }

        PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), StandardCharsets.UTF_8)));
        out.write(content);
        out.flush();
        out.close();
        return true;
    }

    static String readFile(InputStream resourceAsStream) throws IOException {
        StringBuilder back = new StringBuilder();
        BufferedInputStream bf = new BufferedInputStream(resourceAsStream);
        byte[] buff = new byte[1024];
        int len = -1;
        while ((len = bf.read(buff)) != -1) {
            back.append(new String(buff, 0, len, "utf-8"));
        }
        bf.close();
        return back.toString();
    }
}
