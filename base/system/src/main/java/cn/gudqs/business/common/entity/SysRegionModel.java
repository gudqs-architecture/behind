package cn.gudqs.business.common.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author wq
 * @date 2019-5-6
 * @description undefined
 */
@Data
@Table(name = "sys_region")
public class SysRegionModel {

    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer regionId;
    /**
     * 父区域id
     */
    @ApiModelProperty("父区域id")
    private Integer parentId;
    /**
     * 区域名称
     */
    @ApiModelProperty("区域名称")
    private String regionName;
    /**
     * 区域类型，0-中国、1-省、2-市、3-区、4-街道
     */
    @ApiModelProperty("区域类型，0-中国、1-省、2-市、3-区、4-街道")
    private Integer regionType;
    public SysRegionModel() {
    }

    public SysRegionModel(Integer parentId) {
        this.parentId = parentId;
    }
}


