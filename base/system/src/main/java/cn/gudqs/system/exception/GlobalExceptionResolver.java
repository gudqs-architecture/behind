package cn.gudqs.system.exception;

import cn.gudqs.base.ResultBean;
import cn.gudqs.exception.CustomException;
import cn.gudqs.exception.ErrorCodes;
import cn.gudqs.util.CommonUtil;
import cn.gudqs.util.JsonResultUtil;
import cn.gudqs.util.LoggerUtil;
import org.apache.tomcat.util.http.fileupload.FileUploadBase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.DecimalFormat;
import java.util.Enumeration;
import java.util.List;

/**
 * @author wq
 * @date 2018/9/18
 */
@RestControllerAdvice
public class GlobalExceptionResolver {

    @Value("${project.env}")
    private String env;


    public static String getTrace(Throwable t) {
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        t.printStackTrace(writer);
        StringBuffer buffer = stringWriter.getBuffer();
        return buffer.toString();
    }

    /**
     * 处理校验所抛出的异常
     */
    @ExceptionHandler(BindException.class)
    @ResponseBody
    public ResultBean resolveBindException(BindException exception, HttpServletRequest request) {
        LoggerUtil.onlyFile("----------resolveBindException----------");
        String reqInfo = getReqInfo(request);
        LoggerUtil.onlyFile(reqInfo);
        return getResultByValidErrors(exception);
    }

    /**
     * 处理校验所抛出的异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResultBean resolveValidException(MethodArgumentNotValidException exception, HttpServletRequest request) {
        LoggerUtil.onlyFile("----------resolveValidException----------");
        String reqInfo = getReqInfo(request);
        LoggerUtil.onlyFile(reqInfo);
        BindingResult bindingResult = exception.getBindingResult();
        return getResultByValidErrors(bindingResult);
    }

    private ResultBean getResultByValidErrors(BindingResult bindingResult) {
        List<ObjectError> allErrors = bindingResult.getAllErrors();

        if (allErrors == null) {
            return JsonResultUtil.errorResult("all errors null");
        }
        if (allErrors.size() == 1) {
            ObjectError error = allErrors.get(0);
            String defaultMessage = error.getDefaultMessage();
            return JsonResultUtil.errorResult(defaultMessage);
        } else {
            StringBuilder errSbf = new StringBuilder();
            for (ObjectError error : allErrors) {
                errSbf.append(error.getDefaultMessage()).append(",");
            }
            return JsonResultUtil.errorResult(errSbf.substring(0, errSbf.length() - 1));
        }
    }

    private String getReqInfo(HttpServletRequest request) {
        StringBuilder reqInfo = new StringBuilder("请求信息: \nIP : ").append(CommonUtil.getRealIp(request)).append(" \nURI: ").append(request.getRequestURI()).append("\n");
        Enumeration<String> names = request.getParameterNames();
        while (names.hasMoreElements()) {
            String name = names.nextElement();
            String value = request.getParameter(name);
            reqInfo.append("   请求参数：").append(name).append(":").append(value).append("\n");
        }
        return reqInfo.toString() + "\n";
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResultBean resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {

        CustomException customException;

        String reqInfo = getReqInfo(httpServletRequest);
        LoggerUtil.onlyFile(reqInfo);
        e.printStackTrace();

        int code = ErrorCodes.ERROR.getCode();
        if (e instanceof CustomException) {
            customException = (CustomException) e;
            code = customException.getStatusCode();
        } else {
            boolean dev = CommonUtil.isDev(env);
            String msg = "系统开小差了";
            if (dev) {
                Throwable cause = e.getCause();
                msg = e.getMessage();
                if (cause != null) {
                    msg += " :: " + cause;
                }
            }

            if (httpServletRequest.getHeader("back-error-trace") != null) {
                msg = getTrace(e);
            }
            if (httpServletRequest.getHeader("back-req-info") != null) {
                msg += reqInfo;
            }
            customException = new CustomException(msg);
        }
        return JsonResultUtil.errorResult(customException.getMessage(), code);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    @ResponseBody
    public ResultBean resolveFileSizeLimitException(HttpServletRequest request, MaxUploadSizeExceededException e) {
        String reqInfo = getReqInfo(request);
        LoggerUtil.onlyFile(reqInfo);
        Throwable cause = e.getRootCause();
        if (cause instanceof FileUploadBase.FileSizeLimitExceededException) {
            FileUploadBase.FileSizeLimitExceededException exception = (FileUploadBase.FileSizeLimitExceededException) cause;
            long permittedSize = exception.getPermittedSize();
            double cast = 1024d * 1024d;
            DecimalFormat decimalFormat = new DecimalFormat("0.00");
            String message = String.format("文件 [%s] 过大, 不得超过 %sM", exception.getFileName(), decimalFormat.format(permittedSize / cast));
            LoggerUtil.info(message, GlobalExceptionResolver.class);
            return JsonResultUtil.errorResult(message);
        } else {
            return JsonResultUtil.errorResult(e.getMessage());
        }
    }
}
