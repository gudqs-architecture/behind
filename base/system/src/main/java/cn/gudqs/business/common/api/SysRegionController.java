package cn.gudqs.business.common.api;

import cn.gudqs.base.BaseController;
import cn.gudqs.base.ResultBean;
import cn.gudqs.business.common.entity.SysRegionModel;
import cn.gudqs.business.common.service.ISysRegionService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;


/**
 * @author generator by wq
 * @date 2019/05/06 10:17:30
 */
@RestController
@RequestMapping("/api/region")
@Api(description = "行政区域查询")
public class SysRegionController extends BaseController {

    @Resource
    private ISysRegionService sysRegionService;


    @PostMapping("/findAll")
    public ResultBean<List<SysRegionModel>> findAll() throws Exception {
        return success(sysRegionService.findAll());
    }

    @PostMapping("/findByPId")
    public ResultBean<List<SysRegionModel>> findByPId(Integer pid) {
        if (pid == null) {
            pid = 1;
        }
        return success(sysRegionService.select(new SysRegionModel(pid)));
    }


}