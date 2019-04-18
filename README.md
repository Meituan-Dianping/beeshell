# roo-mobile-rn
美团外卖前端组 Roo Design 之 React Native 组件库。

## Table of contents
- [Quick start](#quick-start)
- [Status](#status)
- [Feature](#feature)
- [What's included](#whats-included)

## Quick start

- Install with [mnpm](http://npm.sankuai.com/): `mnpm install @roo/roo-mobile-rn`

## Status
[![mnpm version](http://npm.sankuai.com/badge/v/@roo/roo-mobile-rn.svg?style=flat-square)](http://npm.sankuai.com/package/@roo/roo-mobile-rn)


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
* [Button 按钮](./docs/components/Button.md)
* [Icon 按钮](./docs/components/Icon.md)

#### 导航
* [NavigationBar 导航条](./docs/components/NavigationBar.md)

#### 数据录入
* [Form 表单](./docs/components/Form.md)
* [Input 输入框](./docs/components/Input.md)
* [Radio 单选](./docs/components/Radio.md)
* [Checkbox 多选](./docs/components/Checkbox.md)
* [Switch 开关](./docs/components/Switch.md)
* [Slider 滑块](./docs/components/Slider.md)
* [Rate 评分](./docs/components/Rate.md)
* [Stepper 计步器](./docs/components/Stepper.md)
* [Scrollpicker 滚动选择](./docs/components/Scrollpicker.md)
* [Datepicker 日期选择](./docs/components/Datepicker.md)
* [Timepicker 时间选择](./docs/components/Timepicker.md)
* [Calender 日历](./docs/components/Calendar.md)
* [Cascader 级联选择](./docs/components/Cascader.md)

#### 数据展示
* [Progress 进度条](./docs/components/Progress.md)
* [Badge 徽章](./docs/components/Badge.md)
* [Tab 标签页](./docs/components/Tab.md)
* [Tag 标签](./docs/components/Tag.md)
* [TreeView 树形结构组件](./docs/components/TreeView.md)
* [Longlist 长列表](./docs/components/Longlist.md)


#### 操作反馈
* [Modal 模态框](./docs/components/Modal.md)
* [Dialog 对话框](./docs/components/Dialog.md)
* [Tip 提示信息弹框](./docs/components/Tip.md)
* [SlideModal 滑动弹框](./docs/components/SlideModal.md)
* [ActionSheet 行动面板](./docs/components/Actionsheet.md)
* [BottomModal 半页弹框](./docs/components/BottomModal.md)
* [Popover 弹出框](./docs/components/Popover.md)
* [Picker 筛选器](./docs/components/Picker.md)
* [Topview 顶层视图](./docs/components/Topview.md)

#### 其他
* [Dropdown 下拉菜单](./docs/components/Dropdown.md)
* [Ruler 刻度尺](./docs/components/Ruler.md)

#### 复合组件（包含 Native 部分）

因 Native 部分有内部依赖，该部分暂不开源

### 基础工具
* [定制主题](./docs/common/styles.md)
* [动画](./docs/common/animations.md)
* [JS Utils](./docs/common/utils.md)
* [Form 校验](./docs/common/validator.md)
* [Tree 树形结构处理](./docs/common/Tree.md)
