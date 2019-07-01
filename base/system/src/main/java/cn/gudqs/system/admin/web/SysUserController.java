package cn.gudqs.system.admin.web;

import cn.gudqs.base.BaseController;
import cn.gudqs.base.ParamVo;
import cn.gudqs.base.ResultBean;
import cn.gudqs.system.admin.entity.SysUserModel;
import cn.gudqs.system.admin.service.ISysRoleService;
import cn.gudqs.system.admin.service.ISysUserService;
import cn.gudqs.util.CommonUtil;
import cn.gudqs.util.JwtUtil;
import cn.gudqs.util.crypto.MD5Util;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @author generator by wq
 * @date 2019/04/23 16:06:56
 */
@RestController
@RequestMapping("/admin/user")
@Api(description = "系统用户管理")
public class SysUserController extends BaseController {


    @Value("${project.env}")
    private String env;
    @Resource
    private ISysUserService sysUserService;
    @Resource
    private ISysRoleService sysRoleService;

    @PostMapping("/login")
    public ResultBean login(String loginName, String password) {
        SysUserModel sysUserModel = sysUserService.findByLoginName(loginName);
        if (CommonUtil.isDev(env) && sysUserModel != null) {
            return successUser(sysUserModel);
        }
        boolean rightUser = sysUserModel != null && sysUserModel.getStatus() == 1;
        if (rightUser && MD5Util.getMD5(loginName + password).equals(sysUserModel.getPassword())) {
            return successUser(sysUserModel);
        } else {
            return error("登录失败");
        }
    }

    private ResultBean successUser(SysUserModel sysUserModel) {
        sysUserModel.setPassword(null);
        Map<String, String> data = new HashMap<>(2);
        data.put("uid", sysUserModel.getSysUserId() + "");
        data.put("type", "2");
        String token = JwtUtil.sign(data, 30, Calendar.DAY_OF_MONTH);
        return success(sysUserModel, token);
    }

    @PostMapping("/updatePwd")
    public ResultBean updatePwd(String loginName, String password, String newPwd) throws Exception {
        SysUserModel sysUserModel = sysUserService.findByLoginName(loginName);
        if (sysUserModel != null && MD5Util.getMD5(loginName + password).equals(sysUserModel.getPassword())) {
            sysUserModel.setPassword(MD5Util.getMD5(loginName + newPwd));
            sysUserService.updateSelective(sysUserModel);
            return success();
        } else {
            return error("校验密码失败");
        }
    }

    @PostMapping("/find")
    public ResultBean<List<SysUserModel>> find(@RequestBody ParamVo paramVo) throws Exception {
        return success(sysUserService.findAll(paramVo));
    }

    @PostMapping("/update")
    public ResultBean update(SysUserModel entity) throws Exception {
        sysUserService.updateSelective(entity);
        return success();
    }

    @PostMapping("/add")
    public ResultBean add(@RequestBody SysUserModel entity) throws Exception {
        if (entity.getSysUserId() == null) {
            entity.setPassword(MD5Util.getMD5(entity.getLoginName() + entity.getPassword()));
            sysUserService.insertSelective(entity);
        } else {
            update(entity);
        }
        List<String> sysRoleIds = entity.getSysRoleIds();
        if (sysRoleIds != null && sysRoleIds.size() > 0) {
            for (String sysRoleId : sysRoleIds) {
                sysRoleService.addRole(entity.getSysUserId(), Integer.parseInt(sysRoleId));
            }
        }
        List<String> delSysRoleIds = entity.getDelSysRoleIds();
        if (delSysRoleIds != null && delSysRoleIds.size() > 0) {
            for (String sysRoleId : delSysRoleIds) {
                sysRoleService.delRole(entity.getSysUserId(), Integer.parseInt(sysRoleId));
            }
        }
        return success();
    }

    @PostMapping("/delete")
    public ResultBean delete(@RequestBody Object[] ids) throws Exception {
        sysUserService.delete(ids);
        return success();
    }

}