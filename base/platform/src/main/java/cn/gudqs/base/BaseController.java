package cn.gudqs.base;

import cn.gudqs.exception.ErrorCodes;
import cn.gudqs.exception.ExceptionVo;
import cn.gudqs.util.JsonResultUtil;
import cn.gudqs.util.JsonUtils;
import cn.gudqs.util.MathUtil;
import org.springframework.util.Assert;

import javax.servlet.http.HttpServletRequest;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author wq
 * @date 2018/5/8
 */
public class BaseController {

    protected ResultBean success() {
        return JsonResultUtil.successResult();
    }

    public static <T> ResultBean<List<T>> success(PageEntity<T> data) {
        return JsonResultUtil.successResult(data);
    }

    protected <T> ResultBean<T> success(T data) {
        return JsonResultUtil.successResult(data);
    }

    protected ResultBean<String> success(Integer code, String msg) {
        return JsonResultUtil.successResult(code, msg);
    }

    protected ResultBean<String> success(ErrorCodes success) {
        return JsonResultUtil.successResult(success);
    }

    protected ResultBean<Object> success(Object data, String token) {
        return JsonResultUtil.successResult(data, token);
    }

    protected ResultBean<Object> success(Object data, MapBean other) {
        return JsonResultUtil.successResult(data, other);
    }

    protected <T> ResultBean<T> error(String errDesc) {
        return JsonResultUtil.errorResult(errDesc);
    }

    protected <T> ResultBean<T> error(ErrorCodes errorCodes) {
        return JsonResultUtil.errorResult(errorCodes);
    }

    protected <T> ResultBean<T> error(ExceptionVo exceptionVo) {
        return JsonResultUtil.errorResult(exceptionVo);
    }

    protected <T> ResultBean<T> error(String errDesc, Integer code) {
        return JsonResultUtil.errorResult(errDesc, code);
    }


    protected ParamVo desc(String field) {
        ParamVo paramVo = new ParamVo(0);
        paramVo.desc(field);
        return paramVo;
    }

    protected ParamVo asc(String field) {
        ParamVo paramVo = new ParamVo(0);
        paramVo.asc(field);
        return paramVo;
    }

    public static void require(boolean flag) {
        require(flag, "条件错误");
    }

    public static void require(boolean flag, String msg, Object... args) {
        Assert.isTrue(flag, msg);
    }

    protected <T> ResultBean<List<T>> findLike(IBaseService<T> baseService, Integer pageNo, Integer pageSize, T entity) throws Exception {
        if (entity == null || baseService == null) {
            return null;
        }
        ParamVo paramVo = new ParamVo(pageNo, pageSize);
        return findLikeByParamVo(baseService, entity, paramVo);
    }

    protected <T> ResultBean<List<T>> findLike(IBaseService<T> baseService, T entity) throws Exception {
        return findLike(baseService, entity, null);
    }

    /**
     * 通用的模糊查询
     *
     * @param baseService service
     * @param entity      实体类
     * @param <T>         泛型
     * @param request     req
     * @return 列表
     * @throws Exception err
     */
    protected <T> ResultBean<List<T>> findLike(IBaseService<T> baseService, T entity, HttpServletRequest request) throws Exception {
        if (entity == null || baseService == null) {
            return null;
        }
        ParamVo paramVo = getPageByRequestHeader(request);
        return findLikeByParamVo(baseService, entity, paramVo);
    }

    private <T> ResultBean<List<T>> findLikeByParamVo(IBaseService<T> baseService, T entity, ParamVo paramVo) throws Exception {
        Map<String, Object> entityMap = JsonUtils.getMap(JsonUtils.getJsonString(entity));
        for (String entityProperty : entityMap.keySet()) {
            Object value = entityMap.get(entityProperty);
            if (value != null) {
                paramVo.addFilter(new FilterVo(entityProperty, value));
            }
        }
        return success(baseService.findAll(paramVo));
    }

    private ParamVo getPageByRequestHeader(HttpServletRequest request) {
        if (request != null) {
            String pageNo = request.getHeader("pageNo");
            String pageSize = request.getHeader("pageSize");
            int pageNo0 = 1;
            if (MathUtil.isInt(pageNo)) {
                pageNo0 = MathUtil.parseInt(pageNo);
            }
            int pageSize0 = 20;
            if (MathUtil.isInt(pageSize)) {
                pageSize0 = MathUtil.parseInt(pageSize);
            }
            return new ParamVo(pageNo0, pageSize0);
        } else {
            return new ParamVo(0);
        }
    }

    protected <T> ResultBean<List<T>> findPage(IBaseService<T> baseService, Integer pageNo, Integer pageSize) throws Exception {
        return findPage(baseService, pageNo, pageSize, null);
    }

    /**
     * 通用的分页查询
     *
     * @param baseService service
     * @param pageNo      分页起始
     * @param pageSize    分页大小
     * @param filter      过滤对象
     * @param <T>         泛型
     * @return 分页列表
     * @throws Exception err
     */
    protected <T> ResultBean<List<T>> findPage(IBaseService<T> baseService, Integer pageNo, Integer pageSize, MapBean filter) throws Exception {
        ParamVo paramVo = new ParamVo(pageNo, pageSize);
        paramVo.setPageMode(true);
        return success(baseService.findAll(paramVo, filter));
    }

    protected <T> ResultBean<List<T>> findPage(IBaseService<T> baseService, HttpServletRequest request) throws Exception {
        return findPage(baseService, request, null);
    }

    /**
     * 通用的分页查询(by request)
     *
     * @param baseService service
     * @param request     req
     * @param filter      过滤对象
     * @param <T>         泛型
     * @return 分页列表
     * @throws Exception err
     */
    protected <T> ResultBean<List<T>> findPage(IBaseService<T> baseService, HttpServletRequest request, MapBean filter) throws Exception {
        ParamVo paramVo = getPageByRequestHeader(request);
        paramVo.setPageMode(true);
        return success(baseService.findAll(paramVo, filter));
    }

    /**
     * 统一的优化查询
     *
     * @param baseService service
     * @param paramVo     表格对象
     * @param fastKey     优化的 key(需在 xml where 中实现)
     * @param <T>         泛型
     * @return 分页列表
     * @throws Exception err
     */
    protected <T> ResultBean<List<T>> fastFind(IBaseService<T> baseService, ParamVo paramVo, List<String> fastKey) throws Exception {
        MapBean filter = new MapBean();
        boolean pageMode = true;
        if (paramVo.getFilter().size() > 0) {
            Iterator<FilterVo> iterator = paramVo.getFilter().iterator();
            while (iterator.hasNext()) {
                FilterVo filterVo = iterator.next();
                if (fastKey.contains(filterVo.getField())) {
                    Object value = filterVo.getValue();
                    if (filterVo.getType().equals(FilterVo.Type.STRING)) {
                        value = "%" + value + "%";
                    } else if (filterVo.getType().equals(FilterVo.Type.LIST)) {
                        if (value instanceof List) {
                            List valList = (List) filterVo.getValue();
                            if (valList.size() > 0) {
                                value = valList.get(0);
                            } else {
                                value = null;
                            }
                        }
                    }
                    filter.put(filterVo.getField(), value);
                    iterator.remove();
                } else {
                    pageMode = false;
                }
            }
        }
        paramVo.setPageMode(pageMode);
        return success(baseService.findAll(paramVo, filter));
    }

}
