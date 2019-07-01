package cn.gudqs.util;

import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

/**
 * @author wq
 * @date 2019-03-29
 * @description 事务工具
 */
public class TransactionUtil {

    public static TransactionStatus newTransaction(DataSourceTransactionManager transactionManager) {
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
        return transactionManager.getTransaction(def);
    }

    public static void commit(DataSourceTransactionManager transactionManager, TransactionStatus status) {
        transactionManager.commit(status);
    }

    public static void rollback(DataSourceTransactionManager transactionManager, TransactionStatus status) {
        try {
            transactionManager.rollback(status);
        } catch (Exception e) {
            LoggerUtil.error("transaction commit--> error: " + e.getMessage(), TransactionUtil.class);
        }
    }

}
