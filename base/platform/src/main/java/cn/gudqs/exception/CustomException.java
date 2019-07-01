package cn.gudqs.exception;

/**
 * @author wq
 * @date 2018/9/18
 */
public class CustomException extends RuntimeException {

    private Integer statusCode;

    public CustomException() {
        this.statusCode = 2001;
    }

    public CustomException(String msg) {
        super(msg);
        this.statusCode = 2001;
    }

    public CustomException(ErrorCodes errorCodes) {
        super(errorCodes.getMsg());
        this.statusCode = errorCodes.getCode();
    }

    public CustomException(ExceptionVo exceptionVo) {
        super(exceptionVo.getErrDesc());
        this.statusCode = exceptionVo.getCode();
    }

    public CustomException(String msg, Integer statusCode) {
        super(msg);
        this.statusCode = statusCode;
    }

    public Integer getStatusCode() {
        return statusCode;
    }
}
