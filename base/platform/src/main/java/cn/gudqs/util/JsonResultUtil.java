package cn.gudqs.util;

import cn.gudqs.exception.ErrorCodes;
import cn.gudqs.exception.ExceptionVo;
import cn.gudqs.base.MapBean;
import cn.gudqs.base.PageEntity;
import cn.gudqs.base.ResultBean;

import java.util.List;

/**
 * @author wq
 * @date 2018/5/8
 */
public class JsonResultUtil {

    public static ResultBean successResult() {
        return successResult(ErrorCodes.SUCCESS);
    }

    public static ResultBean<String> successResult(ErrorCodes errorCodes) {
        return new ResultBean<>(errorCodes.getMsg(), errorCodes.getMsg(), errorCodes.getCode(), true);
    }

    public static ResultBean<String> successResult(Integer code, String msg) {
        return new ResultBean<>(msg, msg, code, true);
    }

    public static <T> ResultBean<List<T>> successResult(PageEntity<T> data) {
        return new ResultBean<>(ErrorCodes.SUCCESS.getMsg(), data.getData(), ErrorCodes.SUCCESS.getCode(), data.getTotal());
    }

    public static <T> ResultBean<T> successResult(T data) {
        return new ResultBean<>(ErrorCodes.SUCCESS.getMsg(), data, ErrorCodes.SUCCESS.getCode(), true);
    }

    public static <T> ResultBean<T> successResult(T data, String token) {
        return new ResultBean<>(ErrorCodes.SUCCESS.getMsg(), data, ErrorCodes.SUCCESS.getCode(), true, token);
    }

    public static <T> ResultBean<T> errorResult(String errDesc) {
        return new ResultBean<>(ErrorCodes.ERROR.getMsg(), ErrorCodes.ERROR.getCode(), errDesc, false);
    }

    public static <T> ResultBean<T> errorResult(String errDesc, Integer code) {
        return new ResultBean<>(ErrorCodes.ERROR.getMsg(), code, errDesc, false);
    }

    public static <T> ResultBean<T> errorResult(ErrorCodes errorCodes) {
        return new ResultBean<>(errorCodes.getMsg(), errorCodes.getCode(), errorCodes.getMsg(), false);
    }

    public static <T> ResultBean<T> errorResult(ExceptionVo exceptionVo) {
        return new ResultBean<>(exceptionVo.getErrDesc(), exceptionVo.getCode(), exceptionVo.getErrDesc(), false);
    }

    public static <T> ResultBean<T> successResult(T data, MapBean other) {
        return new ResultBean<>(ErrorCodes.SUCCESS.getMsg(), data, ErrorCodes.SUCCESS.getCode(), true, other);
    }

}
