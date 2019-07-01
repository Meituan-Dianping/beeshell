---
route: /CHANGELOG
---

# Changelog
All notable changes to this project will be documented in this file.

[![npm version](https://img.shields.io/npm/v/beeshell.svg)](https://www.npmjs.com/package/beeshell)


## 2.0.10
*2019-07-01*

**🐛 Fixed**

- Slider 组件完善 step 属性与 marks 属性的关联关系


## 2.0.9
*2019-06-26*

**🐛 Fixed**

- Slider 组件修复 Android 平台 min 等于 max 时的 Bug


## 2.0.8
*2019-06-25*

**⚡️Changed**

- Modal 系列 close 方法支持传入任意参数，onClose、onClosed 属性获取 close 方法传入的参数，点击遮罩关闭的情况，回调方法的第一个参数为 'backdrop'


## 2.0.7
*2019-06-24*

**⚡️Changed**

- Longlist 组件增加 renderFooter 属性，支持自定义页脚部分渲染区域


## 2.0.6
*2019-06-20*

**⚡️Changed**

- SlideModal 组件增加 styles 属性
- Dropdown 组件支持 cancelable 属性

## 2.0.5
*2019-06-12*

**⚡️Changed**

- 某些组件 Web 平台支持
- Modal 重复打开、关闭不再 reject，改为 resolve
- NavigationBar 定制能力增强

## 2.0.4
*2019-05-30*

**⚡️Changed**

- Tab 组件新增 scrollTo 方法
- Scrollpicker 组件修复某些 Android 机型的 Crash

## 2.0.3
*2019-05-23*

**⚡️Changed**

- Input 组件增加 inputStyle 属性，支持实现多行输入
- Tab 支持换行
- trash 图标替换

## 2.0.2
*2019-05-08*

**⚡️Changed**

- Button 动画实现，不支持 Android 平台
- 图标 png 文件替换
- Form.Item 实现优化，防止空 View 占据空间
