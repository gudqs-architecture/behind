# 简介
> 以 superpom 为父项目, 引入spring boot 常用依赖 添加部分公共配置  
  
> platform 存放核心组件代码, 工具类等, 此项目特点是通用性, 里面的代码大多具有通用性, 如 crud, mvc, 常用工具类  

> system 为项目雏形, 意在将具有某些特点的项目封装起来, 方便公共部分代码变动时只需修改一处, 如异常处理, 常见 boot 配置(cors, mybatis, mvc), 拦截器等

## superpom
### 依赖
 - spring boot, 
 - web
 - redis
 - quartz
 - mail
 - lombok
 - swagger
 - test
 
### maven 发布配置
> 配置 发布的 nexus 地址, 含本地及服务器


## platform
###  crud
> `base` 包下, 封装了 通用的三层, 即 mapper, service, controller  
此外还有 表格组件的传输 Vo: ParamVo, 即controller统一返回值类型 `ResultBean`  
`mybatis` 包下, 是表格组件对应的 mybatis 插件的具体实现代码  

### controller 接收值 返回值 json 过滤器
> `system/handler` 及 `system/aop` 分别处理普通参数及带 `@RequestBody` 的参数, 普通返回值及带 `@ResponseBody` 的返回值  
`system/json` 为通过 json 序列化实现过滤的代码实现 

### 工具类
> 大致包含 微信签名及解密, docx 模板下载, http 客户端, redis 工具类等


## system
### 模块代码
> `system/admin` 下含 后台系统的 用户-角色-菜单-权限  
`business/common` 下含 字典, 行政区域

### 常用配置
> cors, 邮件发送, mybatis 插件, 定时任务异常处理, swagger 文档, mvc 拦截器及其他  
`cn.gudqs.system.interceptor` 常用拦截器, 拦截 /api/* 及 /admin/*

### 工具类
> 微信 token   
 七牛云对象存储工具的具体实现  
 jwt 被覆盖
 
### 后台管理(HTML+CSS+JS)
> 含 layui 及 基于 layui 的单页架构  
集成了 echarts, ztree, select2, grid 等组件  
用户-角色-菜单-权限 管理  
字典, 行政区域 管理  
`static/admin/sql2bean.html` SQL DDL 转 XxxModel.java 工具网页

## 包结构
> 见 platform 及 system 下 README.md 文件