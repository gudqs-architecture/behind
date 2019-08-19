## platform 
> 含 通用 mapper 封装, 通用 service, controller 等  
mybaits 分页插件  
工具类

## 目录结构
```
.
└── gudqs
    ├── base
    │   ├── BaseController.java    #通用 controller 父类
    │   ├── BaseEntity.java        #通用实体类父类
    │   ├── BaseServiceImpl.java   #通用 service 旧版
    │   ├── BaseSqlMapper.java     #通用 mapper
    │   ├── CommonServiceImpl.java #通用 service 新版
    │   ├── FilterVo.java          #表格插件 过滤 vo
    │   ├── IBaseService.java      #通用 service 接口
    │   ├── MapBean.java           #map 封装
    │   ├── PageEntity.java        #分页实体类
    │   ├── ParamVo.java           #表格 vo
    │   ├── ResultBean.java        #统一返回值类
    │   ├── SortVo.java            #表格插件 排序 vo
    │   └── tkmapper
    │       ├── Status.java        #status 注解
    │       ├── StatusMapper.java  #status mapper
    │       └── StatusProvider.java #状态操作类 (通用 mapper 的扩展)
    ├── exception
    │   ├── CustomException.java   #自定义异常
    │   └── ErrorCodes.java        #全局 code
    ├── mybatis
    │   ├── ReflectUtil.java        #反射工具类
    │   └── interceptor
    │       ├── AbstractPlugin.java #分页插件抽象类
    │       ├── IDialectPlugin.java #分页插件接口
    │       ├── MariadbPlugin.java  #Mariadb 实现
    │       ├── MysqlPlugin.java    #mysql 实现
    │       └── SqlInterceptor.java #mybaits 插件(定义入口)
    └── util
        ├── ArrayUtils.java        #数组工具类
        ├── CommonUtil.java        #其他
        ├── DateUtils.java         #日期操作
        ├── ImageCodeUtil.java     #图片验证码
        ├── JsonResultUtil.java    #统一返回值帮助类
        ├── JsonUtils.java         #json 工具
        ├── LoggerUtil.java        #日志
        ├── MathUtil.java          #整形,小数
        ├── NameFilter.java        #字符过滤
        ├── QiNiuUtils.java        #七牛云对象存储 sdk
        ├── StringUtil.java        #字符串操作
        ├── ThreadUtil.java        #线程工具类
        ├── TransactionUtil.java   #事务操作
        ├── crypto
        │   ├── Base64.java        #Base64
        │   ├── CryptoUtils.java   #DES 加密,解密
        │   ├── JwtUtils.java      #java web token
        │   ├── MD5Util.java       #md5
        │   ├── MessageUtil.java   #map to xml
        │   ├── PayUtil.java       #微信签名
        │   └── UUIDUtils.java     #uuid, 随机字符
        ├── docx
        │   ├── DocxUtil.java      #docx 模板封装
        │   ├── DocxUtils.java     #poi api 封装
        │   └── ForeachRenderPolicy.java #表格循环渲染器
        ├── file
        │   ├── ExcelUtil.java     #Excel 读取
        │   ├── FileUtil.java      #文件操作
        │   └── ZipUtils.java      #zip 压缩
        └── http
            ├── HttpSSLUtil.java   #ssl 带证书请求
            └── HttpUtils.java     #http client



```