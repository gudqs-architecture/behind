package cn.gudqs.base;

import lombok.Data;

/**
 * @author wq
 * @date 2019-04-23
 * @description platform
 */
@Data
public class ResultBean<T> {

    private boolean success;
    private int code;
    private T data;
    private Integer total;
    private String result;
    private Object other;
    private String errDesc;

    public ResultBean(String result, int code, String errDesc, boolean success) {
        this.result = result;
        this.code = code;
        this.errDesc = errDesc;
        this.success = success;
    }

    public ResultBean(String result, T data, int code, boolean success) {
        this.result = result;
        this.data = data;
        this.code = code;
        this.success = success;
    }

    public ResultBean(String result, T data, int code, Integer total) {
        this.result = result;
        this.data = data;
        this.code = code;
        this.success = true;
        this.total = total;
    }

    public ResultBean(String result, T data, int code, boolean success, Object other) {
        this.result = result;
        this.data = data;
        this.code = code;
        this.success = success;
        this.other = other;
    }
}
