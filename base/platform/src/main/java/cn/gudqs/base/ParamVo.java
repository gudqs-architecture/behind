package cn.gudqs.base;

import cn.gudqs.util.StringUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * @author wq
 * @date 2018/5/10
 */
public class ParamVo {

    private Integer pageNo = 1;
    private Integer pageSize = 20;
    private boolean pageMode = false;
    private List<FilterVo> filter = new ArrayList<>();
    private List<SortVo> sort = new ArrayList<>();
    private MapBean other = new MapBean();

    public ParamVo() {
    }

    public boolean isPageMode() {
        return pageMode;
    }

    public void setPageMode(boolean pageMode) {
        this.pageMode = pageMode;
    }

    public ParamVo(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public ParamVo(Integer pageNo, Integer pageSize) {
        this.setPageNo(pageNo);
        this.setPageSize(pageSize);
    }

    public int getStart() {
        return (pageNo - 1) * pageSize;
    }

    public int getLimit() {
        return pageSize;
    }

    public MapBean getOther() {
        return other;
    }

    public void setOther(MapBean other) {
        this.other = other;
    }

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        if (pageNo == null || pageNo < 1) {
            pageNo = 1;
        }
        this.pageNo = pageNo;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        if (pageSize == null || pageSize < 1) {
            pageSize = 20;
        }
        this.pageSize = pageSize;
    }

    public List<FilterVo> getFilter() {
        return filter;
    }

    public void setFilter(List<FilterVo> filter) {
        this.filter.clear();
        for (FilterVo filterVo : filter) {
            addFilter(filterVo);
        }
    }

    public ParamVo addFilter(FilterVo filterVo) {
        String type = filterVo.getType();
        if (StringUtil.isEmpty(type)) {
            filterVo.setRight(0);
            return this;
        }
        Object value = filterVo.getValue();
        if (value == null) {
            return this;
        }

        String safeValue = value.toString().replaceAll("'", "''");
        String comparison = filterVo.getOperator();
        filterVo.setRight(1);
        filterVo.setValue0(value);

        if (FilterVo.Type.STRING.equals(type)) {
            if (FilterVo.Comparison.FORCE_EQUALS.equals(comparison)) {
                filterVo.setOperator(" = ");
                filterVo.setValue0("'" + safeValue + "'");
            } else {
                filterVo.setOperator(" like ");
                filterVo.setValue0("'%" + safeValue + "%'");
            }
        }
        if (FilterVo.Type.NUMERIC.equals(type) || FilterVo.Type.DATE.equals(type)) {
            dealComparable(filterVo, type, value, safeValue, comparison);

        }
        if (FilterVo.Type.LIST.equals(type)) {
            dealList(filterVo, safeValue);
        }
        this.filter.add(filterVo);
        return this;
    }

    private void dealList(FilterVo filterVo, String safeValue) {
        filterVo.setOperator(" in ");
        StringBuilder sbValue = new StringBuilder("(");
        if (filterVo.getValue() != null) {
            if (filterVo.getValue() instanceof List) {
                List valList = (List) filterVo.getValue();
                for (int j = 0; j < valList.size(); j++) {
                    Object val = valList.get(j);
                    if (val instanceof Integer || val instanceof Float || val instanceof Double) {
                        sbValue.append(val.toString());
                    } else {
                        sbValue.append("'");
                        sbValue.append(safeValue);
                        sbValue.append("'");
                    }
                    if (j < valList.size() - 1) {
                        sbValue.append(",");
                    }
                }
                if (valList.size() > 0) {
                    filterVo.setValue0(sbValue.toString() + ")");
                } else {
                    filterVo.setRight(0);
                }
            } else {
                filterVo.setRight(0);
            }
        }
    }

    private void dealComparable(FilterVo filterVo, String type, Object value, String safeValue, String comparison) {
        if (FilterVo.Comparison.LESS_THEN.equals(comparison)) {
            filterVo.setOperator(" < ");
        }
        if (FilterVo.Comparison.GREAT_THEN.equals(comparison)) {
            filterVo.setOperator(" > ");
        }
        if (FilterVo.Comparison.LESS_AND_EQUALS.equals(comparison)) {
            filterVo.setOperator(" <= ");
        }
        if (FilterVo.Comparison.GREAT_AND_EQUALS.equals(comparison)) {
            filterVo.setOperator(" >= ");
        }
        if (FilterVo.Comparison.NOT_EQUALS.equals(comparison)) {
            filterVo.setOperator(" != ");
        }
        if (FilterVo.Comparison.EQUALS.equals(comparison) || FilterVo.Comparison.FORCE_EQUALS.equals(comparison)) {
            filterVo.setOperator(" = ");
        }
        if (StringUtil.isEmpty(value.toString())) {
            filterVo.setRight(0);
        }
        if (FilterVo.Type.DATE.equals(type)) {
            filterVo.setValue0("'" + safeValue + "'");
            if (FilterVo.Comparison.EQUALS.equals(comparison)) {
                filterVo.setOperator(" like ");
                filterVo.setValue0("'%" + safeValue + "%'");
            }
        }
    }

    public List<SortVo> getSort() {
        return sort;
    }

    public void setSort(List<SortVo> sort) {
        this.sort = sort;
    }

    public ParamVo desc(String field) {
        this.getSort().add(new SortVo(field, "DESC"));
        return this;
    }

    public void asc(String field) {
        this.getSort().add(new SortVo(field, "ASC"));
    }
}
