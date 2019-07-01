package cn.gudqs.base.tkmapper;

import org.apache.ibatis.mapping.MappedStatement;
import tk.mybatis.mapper.entity.EntityColumn;
import tk.mybatis.mapper.mapperhelper.EntityHelper;
import tk.mybatis.mapper.mapperhelper.MapperHelper;
import tk.mybatis.mapper.mapperhelper.MapperTemplate;
import tk.mybatis.mapper.mapperhelper.SqlHelper;

import java.lang.reflect.Field;
import java.util.Iterator;
import java.util.Set;

/**
 * @author wq
 * @date 2019-05-08
 * @description platform
 */
public class StatusProvider extends MapperTemplate {

    public StatusProvider(Class<?> mapperClass, MapperHelper mapperHelper) {
        super(mapperClass, mapperHelper);
    }

    private static String updateStatusColumns(Class<?> entityClass, Integer statusValue) {
        StringBuilder sql = new StringBuilder();
        sql.append("<set>");
        Set<EntityColumn> columnList = EntityHelper.getColumns(entityClass);
        Iterator entityColumnIterator = columnList.iterator();
        Field[] fields = entityClass.getDeclaredFields();

        String statusField = "status";
        Integer statusValue0 = statusValue;
        for (Field field : fields) {
            Status status = field.getAnnotation(Status.class);
            if (status != null) {
                statusField = field.getName();
                if (statusValue == 0) {
                    statusValue0 = status.off();
                } else if (statusValue == 1) {
                    statusValue0 = status.on();
                } else if (statusValue == -1) {
                    statusValue0 = status.delete();
                }
            }
        }
        EntityColumn statusColumn = null;
        if (statusField != null) {
            while (entityColumnIterator.hasNext()) {
                EntityColumn column = (EntityColumn) entityColumnIterator.next();
                if (!column.isId() && column.isUpdatable()) {
                    if (statusField.equals(column.getProperty())) {
                        statusColumn = column;
                    }
                }
            }
        }

        if (statusColumn != null) {
            sql.append(statusColumn.getColumn()).append(" = ").append(statusValue0).append(",");
        }

        sql.append("</set>");
        return sql.toString();
    }

    public String logicDelete(MappedStatement ms) {
        Class<?> entityClass = this.getEntityClass(ms);
        StringBuilder sql = new StringBuilder();
        sql.append(SqlHelper.updateTable(entityClass, this.tableName(entityClass)));
        sql.append(updateStatusColumns(entityClass, -1));

        Set<EntityColumn> columnList = EntityHelper.getPKColumns(entityClass);
        if (columnList.size() == 1) {
            EntityColumn column = columnList.iterator().next();
            sql.append(" where ");
            sql.append(column.getColumn());
            sql.append(" in (${_parameter})");
            return sql.toString();
        } else {
            throw new RuntimeException("继承 logicDelete 方法的实体类[" + entityClass.getCanonicalName() + "]中必须只有一个带有 @Id 注解的字段");
        }
    }

    public String turnOn(MappedStatement ms) {
        Class<?> entityClass = this.getEntityClass(ms);
        StringBuilder sql = new StringBuilder();
        sql.append(SqlHelper.updateTable(entityClass, this.tableName(entityClass)));
        sql.append(updateStatusColumns(entityClass, 1));

        Set<EntityColumn> columnList = EntityHelper.getPKColumns(entityClass);
        if (columnList.size() == 1) {
            EntityColumn column = columnList.iterator().next();
            sql.append(" where ");
            sql.append(column.getColumn());
            sql.append(" in (${_parameter})");
            return sql.toString();
        } else {
            throw new RuntimeException("继承 turnOn 方法的实体类[" + entityClass.getCanonicalName() + "]中必须只有一个带有 @Id 注解的字段");
        }
    }

    public String turnOff(MappedStatement ms) {
        Class<?> entityClass = this.getEntityClass(ms);
        StringBuilder sql = new StringBuilder();
        sql.append(SqlHelper.updateTable(entityClass, this.tableName(entityClass)));
        sql.append(updateStatusColumns(entityClass, 0));

        Set<EntityColumn> columnList = EntityHelper.getPKColumns(entityClass);
        if (columnList.size() == 1) {
            EntityColumn column = columnList.iterator().next();
            sql.append(" where ");
            sql.append(column.getColumn());
            sql.append(" in (${_parameter})");
            return sql.toString();
        } else {
            throw new RuntimeException("继承 turnOff 方法的实体类[" + entityClass.getCanonicalName() + "]中必须只有一个带有 @Id 注解的字段");
        }
    }

}
