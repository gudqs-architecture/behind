package cn.gudqs.base;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * @author wq
 * @date 2018/5/8
 */
public class CommonServiceImpl<T, Mapper extends BaseSqlMapper<T>> implements IBaseService<T> {

    @Autowired
    protected Mapper sqlMapper;

    @Override
    public void insert(T entity) {
        sqlMapper.insert(entity);
    }

    @Override
    public void update(T entity) {
        sqlMapper.updateByPrimaryKey(entity);
    }

    @Override
    public void updateSelective(T entity) {
        sqlMapper.updateByPrimaryKeySelective(entity);
    }

    @Override
    public void insertSelective(T entity) {
        sqlMapper.insertSelective(entity);
    }

    @Override
    public void delete(Object[] ids) {
        if (ids == null || ids.length == 0) {
            return;
        }
        StringBuilder idStr = new StringBuilder();
        for (int i = 0; i < ids.length; i++) {
            Object id = ids[i];
            if (i == ids.length - 1) {
                idStr.append(getIdStr(id));
            } else {
                idStr.append(getIdStr(id)).append(",");
            }
        }
        sqlMapper.deleteByIds(idStr.toString());
    }

    private String getIdStr(Object id) {
        String str;
        if (id instanceof String) {
            str = "'" + id + "'";
        } else {
            str = id + "";
        }
        return str;
    }

    @Override
    public T findById(Integer id) {
        return sqlMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<T> findAll() throws Exception {
        return sqlMapper.selectAll();
    }

    @Override
    public List<T> findAll(Map<String, Object> filters) throws Exception {
        return sqlMapper.findAll(filters);
    }

    @Override
    public List<T> select(T entityFilter) {
        return sqlMapper.select(entityFilter);
    }

    @Override
    public T selectOne(T filter) {
        return sqlMapper.selectOne(filter);
    }

    @Override
    public PageEntity<T> findAll(ParamVo paramVo, MapBean filter) throws Exception {
        if (filter == null) {
            filter = new MapBean();
        }
        filter.put("paramVo", paramVo);
        PageEntity<T> pageEntity = new PageEntity<>();
        filter.put("pageEntity", pageEntity);
        List<T> list = sqlMapper.findAll(filter);
        pageEntity.setData(list);
        return pageEntity;
    }

    @Override
    public PageEntity<T> findAll(ParamVo paramVo) throws Exception {
        return findAll(paramVo, paramVo.getOther());
    }

    @Override
    public int logicDelete(Object[] ids) {
        if (ids == null || ids.length == 0) {
            return 0;
        }
        StringBuilder idStr = new StringBuilder();
        for (int i = 0; i < ids.length; i++) {
            Object id = ids[i];
            if (i == ids.length - 1) {
                idStr.append(getIdStr(id));
            } else {
                idStr.append(getIdStr(id)).append(",");
            }
        }
        return sqlMapper.logicDelete(idStr.toString());
    }

    @Override
    public int turnOn(Object[] ids) {
        if (ids == null || ids.length == 0) {
            return 0;
        }
        StringBuilder idStr = new StringBuilder();
        for (int i = 0; i < ids.length; i++) {
            Object id = ids[i];
            if (i == ids.length - 1) {
                idStr.append(getIdStr(id));
            } else {
                idStr.append(getIdStr(id)).append(",");
            }
        }
        return sqlMapper.turnOn(idStr.toString());
    }

    @Override
    public int turnOff(Object[] ids) {
        if (ids == null || ids.length == 0) {
            return 0;
        }
        StringBuilder idStr = new StringBuilder();
        for (int i = 0; i < ids.length; i++) {
            Object id = ids[i];
            if (i == ids.length - 1) {
                idStr.append(getIdStr(id));
            } else {
                idStr.append(getIdStr(id)).append(",");
            }
        }
        return sqlMapper.turnOff(idStr.toString());
    }
}
