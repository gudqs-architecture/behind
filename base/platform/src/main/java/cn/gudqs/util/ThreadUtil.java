package cn.gudqs.util;

import com.google.common.util.concurrent.ThreadFactoryBuilder;
import org.jboss.logging.Logger;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.*;

/**
 * @author wq
 * @date 2018/11/27
 * @description 线程工具
 */
public class ThreadUtil {

    private static Logger logger = Logger.getLogger(ThreadUtil.class);
    private static boolean debug = false;
    private static ThreadFactory namedThreadFactory = new ThreadFactoryBuilder().setNameFormat("ThreadUtil-pool-%d").build();
    private static ExecutorService multiThreadPool = new ThreadPoolExecutor(10, 2000,
            10L, TimeUnit.SECONDS, new LinkedBlockingQueue<>(15000), namedThreadFactory, new ThreadPoolExecutor.AbortPolicy());

    public static void changeSize(Integer corePoolSize, Integer maxPoolSize, Integer queueSize) {
        multiThreadPool = new ThreadPoolExecutor(corePoolSize, maxPoolSize,
                10L, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>(queueSize), namedThreadFactory, new ThreadPoolExecutor.AbortPolicy());
    }

    public static void debug() {
        ThreadUtil.debug = true;
    }
    public static void execute(Runnable task) {
        multiThreadPool.execute(task);
    }

    private static Map<String, ConcurrentLinkedDeque<Runnable>> waitingTaskGroupList = new HashMap<>(10);
    private static Map<String, Boolean> groupRunning = new HashMap<>(10);
    private static ThreadFactory mailThreadFactory = new ThreadFactoryBuilder().setNameFormat("MailThread-pool-%d").build();
    private static ExecutorService mailThreadPool = new ThreadPoolExecutor(10, 5000,
            10L, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>(50000), mailThreadFactory, new ThreadPoolExecutor.AbortPolicy());

    public synchronized static void add(Runnable task) {
        add("default", task);
    }

    public synchronized static void add(String group, Runnable task) {
        ConcurrentLinkedDeque<Runnable> taskList;
        if (waitingTaskGroupList.containsKey(group)) {
            taskList = waitingTaskGroupList.get(group);
        } else {
            taskList = new ConcurrentLinkedDeque<>();
            waitingTaskGroupList.put(group, taskList);
        }
        boolean taskSizeTooBig = taskList.size() >= 1000;
        if (taskSizeTooBig) {
            throw new RuntimeException("线程队列已满");
        }
        taskList.add(task);
        waitingTaskGroupList.put(group, taskList);
        runTaskFromList(group);
    }

    public static void execute(Runnable task, Integer times) {
        for (int i = 0; i < times; i++) {
            multiThreadPool.execute(task);
        }
    }

    private synchronized static void runTaskFromList(String group) {
        Boolean running;
        if (groupRunning.containsKey(group)) {
            running = groupRunning.get(group);
        } else {
            running = false;
        }
        if (debug) {
            System.out.println("run: group start: " + group + ":" + running);
        }
        if (!running) {
            groupRunning.put(group, true);
            runNext(group);
        }
    }

    private synchronized static void runNext(final String group) {
        if (debug) {
            System.out.println("run: next start: " + group);
        }
        execute(new Runnable() {
            @Override
            public void run() {
                ConcurrentLinkedDeque<Runnable> taskList = waitingTaskGroupList.get(group);
                if (debug) {
                    System.out.println("runNext: start--> " + group + "; size: " + taskList.size());
                }
                if (taskList.size() > 0) {
                    try {
                        final Runnable task0 = taskList.pop();
                        waitingTaskGroupList.put(group, taskList);
                        task0.run();
                    } catch (Exception e) {
                        e.printStackTrace();
                        logger.info("runNext--> error: " + e.toString());
                    }
                    runNext(group);
                } else {
                    groupRunning.put(group, false);
                    if (debug) {
                        System.out.println("run: group end: " + group + ":" + groupRunning.get(group));
                    }
                }
            }
        });
    }

    public static void execute0(Runnable runnable) {
        mailThreadPool.execute(runnable);
    }
}
