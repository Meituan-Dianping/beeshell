---
route: /CHANGELOG
---

# Changelog
All notable changes to this project will be documented in this file.

[![mnpm version](http://npm.sankuai.com/badge/v/@roo/roo-mobile-rn.svg?style=flat-square)](http://npm.sankuai.com/package/@roo/roo-mobile-rn)



## v2.0.13
*2019-06-17*

**⚡️Changed**

- SlideModal 增加各层级元素样式自定义属性 styles

## v2.0.12
*2019-06-12*

**⚡️Changed**

- NavigationBar 定制能力增强

## v2.0.11
*2019-05-29*

**⚡️Changed**

- Tab scrollTo 方法实现优化
- Scrollpicker 特殊 Android 机器 Crash 修复

## v2.0.10
*2019-05-24*

**⚡️Changed**

- Tab 新增 scrollTo 方法，支持滚动到某一项

## v2.0.9
*2019-05-23*

**⚡️Changed**

- Tab 新增 _scroller 属性，支持自动滚动，注意需要与 scrollable 配合使用

## v2.0.8
*2019-05-22*

**⚡️Changed**

- Input 新增 inputStyle 属性，支持多行输入

## v2.0.7
*2019-05-21*

**⚡️Changed**

- Tab 支持横向换行
- trash 图标替换

## v2.0.6
*2019-05-08*

**⚡️Changed**

- Button 动画实现，不支持 Android 平台
- 图标 png 文件替换
- Form.Item 实现优化，防止空 View 占据空间

## v2.0.5
*2019-05-06*

**⚡️Changed**

- 多个组件属性名调整，属性名规范化

## v2.0.4
*2019-04-24*

**⚡️Changed**

- Topview 解决多 jsbundle 切换导致元素丢失的问题，样式变量支持 zIndex 配置
- Modal Android 平台兼容调整

## v2.0.3
*2019-04-23*

**⚡️Changed**

- Modal 系列支持 scrollable 属性，在内容溢出屏幕时可以滚动
- Modal 系列属性 backdropOpacity 去掉，通过 backdropColor 的 rgba 色值控制透明度

## v2.0.2
*2019-04-18*

**⚡️Changed**

- Dropdown 实现完善
- Tip 类方法 show 的实现方式完善，隐藏重复关闭警告


## v2.0.1
*2019-04-18*

1.0 升级 2.0，有很多不兼容性改动，建议对所有组件进行回归

**⚡️Changed**

- 弹框系列统一修改
- 动画修改
- 各组件的图标属性暴露
- Longlist Android 兼容性修复
- 其他等等组件修改......

**✨ Added**

- 文档


## v1.0.15
*2019-04-02*

**🐛 Fixed**

- Picker 组件 Android 平台 bug 修复
- Stepper 组件 Android 平台样式修复

## v1.0.14
*2019-04-02*

**🐛 Fixed**

- Topview screen 宽度与高度默认值修改，修复 1.0.13 版本的 bug

## v1.0.13
*2019-04-02*

**⚡️Changed**

- Modal 系列组件底层升级，涉及改动 Modal、SlideModal、Topview、动画部分，建议对弹框相关的功能统一回归


## v1.0.12
*2019-04-02*

**⚡️Changed**

- Modal 系列组件（包括 SlideModal、Dialog 等），支持 screenWidth、screenHeight 属性，计算位置的基础值由用户控制，功能实现与平台环境解耦


## v1.0.11
*2019-03-25*

**⚡️Changed**

- Input 组件，修改默认样式，替换 android 平台清空按钮图标（android 平台 Image 不支持 tintColor）


## v1.0.10
*2019-03-25*
**✨ Added**

- roo 上报问题修复

## v1.0.9
*2019-03-25*
**✨ Added**

- roo 上报

## v1.0.8
*2019-03-12*


**⚡️Changed**

- Rate 组件增加 this.containerView 使用前的判空，防止引起 Crash

## v1.0.7
*2019-02-27*


**⚡️Changed**

- Modal 组件增加 offset 相关属性


## v1.0.6
*2019-02-19*


**⚡️Changed**

- 指明依赖 moment


## v1.0.0
*2019-01-15*
**✨ Added**

- Button、Icon、NavigationBar


**⚡️Changed**

None


**🐛 Fixed**

None
