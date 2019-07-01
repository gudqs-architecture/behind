# 自动构建说明

## SQL 转 Model
运行项目, 访问 /admin/sql2bean.html, 按提示粘贴 SQL, 复制代码后,  
在此包下 (`com.mountain.generator`) 新建一个 `Java Class`, 将代码覆盖粘贴即可

## Model 生成 mapper,service,controller,mapper xml
首先, 编辑 generator-config.properties 文件, 一般只需要修改 `generator.to.package`  
然后 在终端 运行 `generator.sh` (Mac or Linux) 或 `generator.bat` (Windows) 即可