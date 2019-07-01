package cn.gudqs.exception;

import lombok.Data;

/**
 * @author wq
 * @date 2019-05-24
 * @description platform
 */
@Data
public class ExceptionVo {

    private Integer code;
    private String errDesc;

    public ExceptionVo(Integer code, String errDesc) {
        this.code = code;
        this.errDesc = errDesc;
    }
}
