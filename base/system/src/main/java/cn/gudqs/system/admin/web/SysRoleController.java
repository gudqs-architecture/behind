package cn.gudqs.system.admin.web;

import cn.gudqs.base.BaseController;
import cn.gudqs.base.ParamVo;
import cn.gudqs.base.ResultBean;
import cn.gudqs.system.admin.entity.SysRoleModel;
import cn.gudqs.system.admin.service.ISysRoleService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
@RestController
@RequestMapping("/admin/role")
@Api(description = "系统角色管理")
public class SysRoleController extends BaseController {

    @Resource
    private ISysRoleService sysRoleService;

    @PostMapping("/find")
    public ResultBean<List<SysRoleModel>> find(@RequestBody ParamVo paramVo) throws Exception {
        return success(sysRoleService.findAll(paramVo));
    }

    @GetMapping("/findBySysUserId")
    public ResultBean<List<SysRoleModel>> findBySysUserId(Integer sysUserId) throws Exception {
        if (sysUserId == null) {
            return success(sysRoleService.findAll());
        } else {
            return success(sysRoleService.findBySysUserId(sysUserId));
        }
    }

    @PostMapping("/update")
    public ResultBean update(SysRoleModel entity) throws Exception {
        sysRoleService.updateSelective(entity);
        return success();
    }

    @PostMapping("/add")
    public ResultBean add(SysRoleModel entity) throws Exception {
        if (entity.getSysRoleId() == null) {
            sysRoleService.insertSelective(entity);
        } else {
            update(entity);
        }
        return success();
    }

    @PostMapping("/delete")
    public ResultBean delete(@RequestBody Object[] ids) throws Exception {
        sysRoleService.delete(ids);
        return success();
    }

}