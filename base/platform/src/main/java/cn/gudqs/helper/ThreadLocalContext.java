package cn.gudqs.helper;

/**
 * @author wq
 * @date 2019-05-10
 * @description qing-yuan-api
 */
public class ThreadLocalContext<V> implements CommonContext<V> {

    private ThreadLocal<V> threadLocal = new ThreadLocal<>();

    @Override
    public V get() {
        return threadLocal.get();
    }

    @Override
    public void set(V v) {
        threadLocal.set(v);
    }

    @Override
    public void remove() {
        threadLocal.remove();
    }
}
