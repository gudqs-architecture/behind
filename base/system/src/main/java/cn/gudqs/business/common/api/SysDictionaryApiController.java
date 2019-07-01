package cn.gudqs.business.common.api;

import cn.gudqs.base.BaseController;
import cn.gudqs.base.MapBean;
import cn.gudqs.base.ResultBean;
import cn.gudqs.business.common.entity.SysDictionaryModel;
import cn.gudqs.business.common.service.ISysDictionaryService;
import cn.gudqs.helper.DictionaryUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;


/**
 * @author generator by wq
 * @date 2019/05/06 10:12:24
 */
@RestController
@RequestMapping("/api/sys/dictionary")
@Api(description = "字典查询")
public class SysDictionaryApiController extends BaseController {

    @Resource
    private ISysDictionaryService sysDictionaryService;

    @ApiOperation("根据 parent code 查询字典数据")
    @PostMapping("/findAll")
    public ResultBean<List<SysDictionaryModel>> findAll(String parentCode) {
        require(parentCode != null, "parentCode 不能为空");
        return success(DictionaryUtil.findByParentCode(parentCode));
    }

    @ApiOperation("根据 code 查询字典信息")
    @PostMapping("/findByCode")
    public ResultBean<SysDictionaryModel> findByCode(String code) {
        require(code != null, "code 不能为空");
        return success(DictionaryUtil.findByCode(code));
    }

    @ApiOperation("根据 parentCodes 数组查询字典数据")
    @PostMapping("/findByCodes")
    public ResultBean<MapBean> findByCodes(@RequestBody String[] parentCodes) {
        require(parentCodes != null && parentCodes.length > 0, "parentCodes 不能为空");
        MapBean codeMap = new MapBean();
        for (String parentCode : parentCodes) {
            List<SysDictionaryModel> dictionaryModels = DictionaryUtil.findByParentCode(parentCode);
            codeMap.put(parentCode, dictionaryModels);
        }
        return success(codeMap);
    }


}