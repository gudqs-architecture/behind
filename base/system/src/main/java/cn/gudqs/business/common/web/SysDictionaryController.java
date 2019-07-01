package cn.gudqs.business.common.web;

import cn.gudqs.base.BaseController;
import cn.gudqs.base.FilterVo;
import cn.gudqs.base.ParamVo;
import cn.gudqs.base.ResultBean;
import cn.gudqs.business.common.entity.SysDictionaryModel;
import cn.gudqs.business.common.service.ISysDictionaryService;
import cn.gudqs.helper.DictionaryUtil;
import io.swagger.annotations.Api;
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
@RequestMapping("/admin/sys/dictionary")
@Api(description = "系统字典管理")
public class SysDictionaryController extends BaseController {

    @Resource
    private ISysDictionaryService sysDictionaryService;

    @PostMapping("/findParent")
    public ResultBean<List<SysDictionaryModel>> findParent(@RequestBody ParamVo paramVo) throws Exception {
        paramVo.addFilter(new FilterVo("parentId", FilterVo.Comparison.EQUALS, 0, FilterVo.Type.NUMERIC));
        paramVo.desc("displayOrder");
        return success(sysDictionaryService.findAll(paramVo));
    }

    @PostMapping("/find")
    public ResultBean<List<SysDictionaryModel>> find(@RequestBody ParamVo paramVo, Integer parentId) throws Exception {
        paramVo.addFilter(new FilterVo("parentId", FilterVo.Comparison.EQUALS, parentId, FilterVo.Type.NUMERIC));
        paramVo.desc("displayOrder");
        return success(sysDictionaryService.findAll(paramVo));
    }

    @PostMapping("/update")
    public ResultBean update(SysDictionaryModel entity) throws Exception {
        sysDictionaryService.updateSelective(entity);
        DictionaryUtil.set(entity);
        return success();
    }

    @PostMapping("/add")
    public ResultBean add(SysDictionaryModel entity) throws Exception {
        sysDictionaryService.insertSelective(entity);
        DictionaryUtil.set(entity);
        return success();
    }

    @PostMapping("/delete")
    public ResultBean delete(@RequestBody Object[] ids) throws Exception {
        sysDictionaryService.delete(ids);
        return success();
    }

}