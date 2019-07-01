package cn.gudqs.system.admin.web;

import cn.gudqs.base.BaseController;
import cn.gudqs.base.ResultBean;
import cn.gudqs.exception.ErrorCodes;
import cn.gudqs.system.admin.entity.SysAuthModel;
import cn.gudqs.system.admin.entity.SysMenuModel;
import cn.gudqs.system.admin.service.ISysAuthService;
import cn.gudqs.system.admin.service.ISysMenuService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
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
@RequestMapping("/admin/auth")
@Api(description = "系统角色权限管理")
public class SysAuthController extends BaseController {

    @Resource
    private ISysAuthService sysAuthService;
    @Resource
    private ISysMenuService menuService;

    @ApiOperation("查询当前用户的所有权限")
    @PostMapping("/findAll")
    public ResultBean findAll(HttpServletRequest request) {
        Object uid = request.getAttribute("uid");
        if (uid != null) {
            Integer userId = (Integer) uid;
            return success(sysAuthService.findBySysUserId(userId));
        } else {
            return error(ErrorCodes.TOKEN_NOT_MATCH);
        }
    }

    @PostMapping("/findMenu")
    public ResultBean<List<SysMenuModel>> findMenu(Integer sysRoleId) throws Exception {
        if (sysRoleId == null) {
            return success(menuService.findAll());
        } else {
            return success(menuService.findBySysRoleId(sysRoleId));
        }
    }

    @PostMapping("/addMenu")
    public ResultBean addMenu(Integer sysRoleId, Integer sysMenuId) {
        if (sysRoleId == null) {
            return error("role id 为空");
        }
        menuService.addMenu(sysMenuId, sysRoleId);
        return success();
    }

    @PostMapping("/delMenu")
    public ResultBean delMenu(Integer sysRoleId, Integer sysMenuId) {
        if (sysRoleId == null) {
            return error("role id 为空");
        }
        menuService.delMenu(sysMenuId, sysRoleId);
        return success();
    }

    @PostMapping("/findByRole")
    public ResultBean<List<SysAuthModel>> findByRole(Integer sysRoleId) throws Exception {
        if (sysRoleId == null) {
            return success(sysAuthService.findAll());
        } else {
            return success(sysAuthService.findBySysRoleId(sysRoleId));
        }
    }

    @PostMapping("/add")
    public ResultBean add(Integer sysRoleId, Integer sysAuthId) {
        if (sysRoleId == null) {
            return error("role id 为空");
        }
        sysAuthService.addAuth(sysRoleId, sysAuthId);
        return success();
    }

    @PostMapping("/delete")
    public ResultBean delete(Integer sysRoleId, Integer sysAuthId) {
        if (sysRoleId == null) {
            return error("role id 为空");
        }
        sysAuthService.delAuth(sysRoleId, sysAuthId);
        return success();
    }

}