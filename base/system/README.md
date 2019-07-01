
## system
> 含系统用户-角色-菜单-权限  
统一异常处理  
接受及返回值过滤器
工具类  
字典  
行政区域


## 目录结构

```
.
├── java
│   └── com
│       └── mountain
│           ├── business
│           │   └── common #含字典,行政区域,及通用图片上传
│           ├── helper
│           │   ├── CommonCache.java       #cache 接口
│           │   ├── CommonContext.java     #context 接口
│           │   ├── DictionaryUtil.java    #字典工具类
│           │   ├── MapCache.java          #map cache 实现
│           │   ├── SpringContextUtil.java #spring 工具类
│           │   └── ThreadLocalContext.java #context 的 ThreadLocal 实现
│           ├── system
│           │   ├── admin      #含用户-角色-菜单-权限
│           │   ├── annotation #注解
│           │   │   └── json
│           │   │       ├── JsonRequestFilter.java  #接收值过滤
│           │   │       ├── JsonRequestFilters.java
│           │   │       ├── JsonResponseFilter.java #返回值过滤
│           │   │       └── JsonResponseFilters.java
│           │   ├── aop
│           │   │   ├── JsonFilterRequestBodyAdvice.java  #reqeustBody 过滤
│           │   │   └── JsonFilterResponseBodyAdvice.java #responseBody 过滤
│           │   ├── configuration
│           │   │   ├── CorsFilterConfiguration.java    #配置跨域
│           │   │   ├── MailConfiguration.java          #邮件服务器配置
│           │   │   ├── MybatisConfiguration.java       #配置 mybaits 插件
│           │   │   ├── SchedulingConfiguration.java    #配置定时任务
│           │   │   ├── SwaggerConfiguration.java       #配置 swagger
│           │   │   └── WebAppConfiguration.java        #配置 mvc, 
│           │   ├── exception
│           │   │   ├── GlobalExceptionResolver.java
│           │   │   └── ThreadExceptionHandler.java
│           │   ├── handler
│           │   │   ├── JsonFilterArgumentResolver.java   #参数处理器(处理过滤)
│           │   │   └── JsonFilterReturnValueHandler.java #返回值处理器(处理过滤)
│           │   ├── interceptor
│           │   │   ├── AdminInterceptor.java     #admin 拦截器, 拦截 /admin 开头的请求
│           │   │   └── ApiTokenInterceptor.java  #api 拦截器, 拦截 /api 开头的请求
│           │   └── json
│           │       ├── CustomerJsonSerializer.java  #json 序列号(过滤)
│           │       └── JacksonFilter.java
│           └── util
│               ├── QiNiuUtil.java   #七牛云
│               ├── RedisLock.java   #Redis 分布式锁
│               ├── RedisUtils.java  #Redis 操作
│               └── token
│                   ├── CommonWeChatToken.java    #通用微信 token
│                   ├── MiniWechatTokenUtil.java  #小程序 token
│                   └── PublicWechatTokenUtil.java #公众号 token
└── resources
    └── static
        └── admin
            ├── app
            │   ├── app.js       #入口 js
            │   ├── index.html   #入口 HTML
            │   ├── index.js     #首页逻辑 js
            │   ├── login        #登录及修改密码
            │   ├── modules        #模块目录
            │   │   ├── common.js  #公共方法
            │   │   ├── echarts.js #集成 echarts
            │   │   ├── global.js  #全局方法,对象
            │   │   ├── grid.js    #表格组件
            │   │   ├── select2.js #集成 select2
            │   │   ├── tab.js     #tab 导航
            │   │   ├── ztree.js   #集成 ztree
            │   │   └── zyupload.js #集成 zyupload
            │   ├── region         #行政区域
            │   ├── sysDictionary  #系统字典
            │   ├── text.js        #HTML 模板获取组件
            │   ├── userAuth       #角色权限
            │   ├── userManage     #用户管理
            │   └── webConfig.js   #请求路径配置
            ├── layui   #layui
            ├── res
            │   ├── css
            │   │   ├── app.css         #全局 css
            │   │   ├── grid.css        #表格样式
            │   │   ├── select2.min.css #select2 样式
            │   │   └── tab.css         #tab 样式
            │   ├── font-awesome        #字体库
            │   ├── img
            │   │   └── data-null.png   #表格无数据时图片
            │   ├── jquery-zTree        #ztree 目录(含 css等资源)
            │   └── template
            └── sql2bean.html          #SQL DDL 生成 Model
```