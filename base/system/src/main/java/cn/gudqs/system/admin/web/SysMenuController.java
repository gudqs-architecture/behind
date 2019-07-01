package cn.gudqs.system.admin.web;

import cn.gudqs.base.BaseController;
import cn.gudqs.base.ParamVo;
import cn.gudqs.base.ResultBean;
import cn.gudqs.system.admin.entity.SysMenuModel;
import cn.gudqs.system.admin.service.ISysMenuService;
import cn.gudqs.util.CommonUtil;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;


/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
@RestController
@RequestMapping("/admin/menu")
@Api(description = "系统菜单管理")
public class SysMenuController extends BaseController {

    @Resource
    private ISysMenuService sysMenuService;

    @PostMapping("/findAll")
    public ResultBean<List<SysMenuModel>> findAll(HttpServletRequest request) {
        Integer userId = CommonUtil.getUserId(request);
        return success(sysMenuService.findBySysUserId(userId));
    }

    @PostMapping("/find")
    public ResultBean<List<SysMenuModel>> find(@RequestBody ParamVo paramVo) throws Exception {
        return success(sysMenuService.findAll(paramVo));
    }

    @PostMapping("/update")
    public ResultBean update(SysMenuModel entity) throws Exception {
        sysMenuService.updateSelective(entity);
        return success();
    }

    @PostMapping("/delete")
    public ResultBean delete(@RequestBody Object[] ids) throws Exception {
        sysMenuService.delete(ids);
        return success();
    }

}