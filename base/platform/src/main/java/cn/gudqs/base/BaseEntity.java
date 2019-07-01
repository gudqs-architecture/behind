package cn.gudqs.base;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author wq
 * @date 2019-05-09
 * @description platform
 */
@Data
public class BaseEntity {

    private Integer status;
    @ApiModelProperty(hidden = true)
    private Integer createUserId;
    @ApiModelProperty(hidden = true)
    private Integer updateUserId;
    @ApiModelProperty(hidden = true)
    private String createDate;
    @ApiModelProperty(hidden = true)
    private String updateDate;

}
