package cn.gudqs.business.common.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author wq
 * @date 2019-5-6
 * @description 系统字典表
 */
@Data
@Table(name = "sys_dictionary")
public class SysDictionaryModel {

    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer dictionaryId;
    /**
     * 父字典 id
     */
    @ApiModelProperty("父字典 id")
    private Integer parentId;
    /**
     * 字典 key
     */
    @ApiModelProperty("字典 key")
    private String dictionaryCode;
    /**
     * 字典值
     */
    @ApiModelProperty("字典值")
    private String dictionaryValue;
    /**
     * 描述
     */
    @ApiModelProperty("描述")
    private String dictionaryMemo;
    /**
     * 预留字典类型
     */
    @ApiModelProperty("预留字典类型")
    private Integer dictionaryType;
    /**
     * 排序, 数字越大越靠前
     */
    @ApiModelProperty("排序, 数字越大越靠前")
    private Integer displayOrder;

    public SysDictionaryModel() {
    }

    public SysDictionaryModel(Integer parentId) {
        this.parentId = parentId;
    }

    public SysDictionaryModel(String code) {
        this.dictionaryCode = code;
    }
}


