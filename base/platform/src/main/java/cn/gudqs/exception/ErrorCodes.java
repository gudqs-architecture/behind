package cn.gudqs.exception;

/**
 * @author wq
 * @date 2019/9/19
 * @description 全局错误码
 */
public enum ErrorCodes {

    // token  100*
    TOKEN_ERROR(1001, "token 无效"),
    TOKEN_NOT_MATCH(1002, "token 不匹配"),
    NO_PERMISSION(1003, "用户权限不足"),

    // 请求相关 200*
    SUCCESS(2000, "请求成功"),
    ERROR(2001, "请求失败"),
    REQUEST_TOO_FAST(2007, "访问过于频繁"),

    // 登录相关 400*
    LOGIN_SUCCESS(4000, "登录成功"),
    LOGIN_ERROR(4001, "登录失败");

    private String msg;
    private int code;

    ErrorCodes(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getMsg() {
        return this.msg;
    }

    public int getCode() {
        return this.code;
    }
}
