package cn.gudqs.util.file;

import cn.gudqs.exception.CustomException;
import cn.gudqs.util.crypto.UUIDUtils;
import cn.gudqs.util.http.HttpUtils;
import org.springframework.util.FileCopyUtils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * @author wq
 * @date 2018/9/29
 * @description seo-new
 */
public class FileUtil {
    /**
     * 将图片写到 硬盘指定目录下
     */
    public static void savePicToDisk(InputStream in, String dirPath, String filePath) {
        try {
            File dir = new File(dirPath);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String realPath = dirPath.concat(filePath);
            File file = new File(realPath);
            if (!file.exists()) {
                file.createNewFile();
            }

            FileOutputStream fos = new FileOutputStream(file);
            byte[] buf = new byte[1024];
            int len = 0;
            while ((len = in.read(buf)) != -1) {
                fos.write(buf, 0, len);
            }
            fos.flush();
            fos.close();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static String uploadFile(String requestUrl, String url, String fileName) throws IOException {
        URL urlObj = new URL(requestUrl);

        HttpURLConnection con = (HttpURLConnection) urlObj.openConnection();
        String result = null;
        con.setDoInput(true);

        con.setDoOutput(true);

        con.setUseCaches(false);

        // 设置请求头信息
        con.setRequestProperty("Connection", "Keep-Alive");
        con.setRequestProperty("Charset", "UTF-8");
        // 设置边界
        String boundary = "----------" + System.currentTimeMillis();
        con.setRequestProperty("Content-Type",
                "multipart/form-data; boundary="
                        + boundary);

        // 请求正文信息
        // 第一部分：
        StringBuilder sb = new StringBuilder();
        sb.append("--");
        sb.append(boundary);
        sb.append("\r\n");

        InputStream img = HttpUtils.getImg(url);
        if (img == null) {
            throw new CustomException("img data null");
        }
        
        sb.append("Content-Disposition: form-data;name=\"media\";filelength=\"").append(img.available()).append("\";filename=\"").append(fileName).append("\"\r\n");
        sb.append("Content-Type:application/octet-stream\r\n\r\n");
        byte[] head = sb.toString().getBytes(StandardCharsets.UTF_8);
        // 获得输出流
        OutputStream out = new DataOutputStream(con.getOutputStream());
        // 输出表头
        out.write(head);

        DataInputStream in = new DataInputStream(img);
        int bytes;
        byte[] bufferOut = new byte[1024];
        while ((bytes = in.read(bufferOut)) != -1) {
            out.write(bufferOut, 0, bytes);
        }
        in.close();
        // 结尾部分
        byte[] foot = ("\r\n--" + boundary + "--\r\n").getBytes(StandardCharsets.UTF_8);
        out.write(foot);
        out.flush();
        out.close();
        StringBuilder buffer = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            result = buffer.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String TEMP_DIR = System.getProperty("java.io.tmpdir") + File.separator;

    public static File getTempFileByInputStream(InputStream inputStream) throws IOException {
        File tempFile = new File(TEMP_DIR, UUIDUtils.newID());
        FileOutputStream fileOutputStream = new FileOutputStream(tempFile);
        FileCopyUtils.copy(inputStream, fileOutputStream);
        fileOutputStream.close();
        return tempFile;
    }
}
