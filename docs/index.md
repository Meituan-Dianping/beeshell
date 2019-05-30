# beeshell

## Table of contents
- [Quick start](#quick-start)
- [Status](#status)
- [Feature](#feature)
- [What's included](#whats-included)
- [Live demo](#live-demo)

## Quick start

- Install with [npm](https://www.npmjs.com/): `npm install beeshell`

## Status
[![npm version](https://img.shields.io/npm/v/beeshell.svg)](https://www.npmjs.com/package/beeshell)


## Feature

- UI 样式的一致性和定制化。
- 通用性。主要使用 JS 来实现，保证跨平台通用性。
- 定制化。我们在比较细的粒度上对组件进行拆分，通过继承的方式层层依赖，功能渐进式增强，为在任意层级上的继承扩展、个性化定制提供了可能。
- 原生功能支持。组件库中的复合组件包含 Native 代码，支持图片选择、定位等原生功能，因有内部依赖，暂不开源。
- 功能丰富。不仅仅提供组件，还提供了基础工具、动画以及 UI 规范。
- 完善的文档和使用示例。


## What's included

### 组件

#### 通用
* [Button 按钮](./components/Button.md)
* [Icon 按钮](./components/Icon.md)

#### 导航
* [NavigationBar 导航条](./components/NavigationBar.md)
* [Dropdown 下拉菜单](./components/Dropdown.md)

#### 数据录入
* [Form 表单](./components/Form.md)
* [Input 输入框](./components/Input.md)
* [Radio 单选](./components/Radio.md)
* [Checkbox 多选](./components/Checkbox.md)
* [Switch 开关](./components/Switch.md)
* [Slider 滑块](./components/Slider.md)
* [Rate 评分](./components/Rate.md)
* [Stepper 计步器](./components/Stepper.md)
* [Scrollpicker 滚动选择](./components/Scrollpicker.md)
* [Datepicker 日期选择](./components/Datepicker.md)
* [Timepicker 时间选择](./components/Timepicker.md)
* [Calender 日历](./components/Calendar.md)
* [Cascader 级联选择](./components/Cascader.md)

#### 数据展示
* [Progress 进度条](./components/Progress.md)
* [Badge 徽章](./components/Badge.md)
* [Tab 标签页](./components/Tab.md)
* [Tag 标签](./components/Tag.md)
* [TreeView 树形结构组件](./components/TreeView.md)
* [Longlist 长列表](./components/Longlist.md)


#### 操作反馈
* [Modal 模态框](./components/Modal.md)
* [Dialog 对话框](./components/Dialog.md)
* [Tip 提示信息弹框](./components/Tip.md)
* [SlideModal 滑动弹框](./components/SlideModal.md)
* [Actionsheet 行动面板](./components/Actionsheet.md)
* [BottomModal 半页弹框](./components/BottomModal.md)
* [Popover 弹出框](./components/Popover.md)
* [Picker 筛选器](./components/Picker.md)
* [Topview 顶层视图](./components/Topview.md)

#### 其他
* [Ruler 刻度尺](./components/Ruler.md)

#### 复合组件（包含 Native 部分）

因 Native 部分有内部依赖，该部分暂不开源

### 基础工具
* [定制主题](./common/styles.md)
* [动画](./common/animations.md)
* [JS Utils](./common/utils.md)
* [Form 校验](./common/validator.md)
* [Tree 树形结构处理](./common/Tree.md)

## Live demo

- 下载美团 APP（[iOS](https://itunes.apple.com/cn/app/%E7%BE%8E%E5%9B%A2-%E5%90%83%E5%96%9D%E7%8E%A9%E4%B9%90-%E5%B0%BD%E5%9C%A8%E7%BE%8E%E5%9B%A2/id423084029?mt=8)）

- 进入首页，点击右上角“+”号，选择“扫一扫”，扫描下面二维码

![image](./images/live-demo.png)