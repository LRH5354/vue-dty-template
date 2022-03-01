# krpano-editor-vuejs

## 简介
基于开源项目 `https://github.com/xxweimei/krpano-editor-vuejs`修改，添加自定义功能。
## 食用说明书
+ clone项目到本地
+ 安装nodejs
+ 在项目根目录执行 `npm install` 安装相关依赖包
+ 在项目根目录执行 `npm run dev` 启动项目（默认弹出页面，未弹出访问`http://localhost:8080/`即可）
+ 在项目根目录执行 `npm run build` 打包项目

## 关于项目的一些说明
+ 使用简单的nodejs express提供静态资源服务器功能，以及提供保存接口实现本地tour.xml文件的修改以及数据源配置文件读取等接口，具体参考build/dev-server.js文件中注释点
+ 项目核心难点是对krpano的各种api和xml配置文件的理解，具体参考[官网文档](https://krpano.com/docu/)即可
## 项目功能点
+ 添加批量添加热点
+ 添加热点跳转场景
+ 添加数据源切换
+ 添加热点信息查看

## 一键生成热点使用方法
+ 将krpano生成的全景应用放在系统的目录“src/static/staticPanos”下
+ 将全景一条线的经纬度配置文件放在“data/”目录下
+ 保持全景应用文件夹的名称与经纬度配置文件名称一致

系统自动读取staticPanos文件下的全部全景文件夹当成数据源
