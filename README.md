# roo-mobile-rn
美团外卖前端组 Roo Design 之 React Native 组件库。

## 使用说明


## 开发相关

### 开发规范
命名规范：文件夹、文件使用驼峰命名，如果文件或者文件夹是 React 组件或者自定义类则首字母大写；代码中变量命名当然使用驼峰。
代码风格：TSLint

### 目录结构

`src` 目录：组件库源码。
`examples` 目录：组件 Demo。
`__tests__` 目录：jest 测试用例。
`docs` 目录：各个组件的使用说明。

### 开发流程

- git clone ssh://git@git.sankuai.com/wm/roo-mobile-rn.git
- yarn 安装依赖，注意设置私有源 yarn config set registry http://r.npm.sankuai.com
- yarn start 启动 jsbundle 服务
- 打开 iOS 模拟器，手动安装美团 APP，通过协议跳转进入 MRN 容器

## 测试

## 发布

- 更新 CHANGELOG.md 记录升级内容
- 在根目录运行 mnpm publish 发布包 @roo/roo-mobile-rn