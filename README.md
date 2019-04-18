<p align="center">
    <h3 align="center">beeshell 2.0</h3>
    <p align="center">
    一个 React Native 应用的基础组件库，基于 0.53.3 版本，提供一整套开箱即用的高质量组件，包含 JS 组件和复合组件（包含 Native 代码），涉及 FE、iOS、Android 三端技术，兼顾通用性和定制化，支持自定义主题，用于开发和服务企业级移动应用。
    </p>
</p>

## Table of contents
- [Quick start](#quick-start)
- [Status](#status)
- [Feature](#feature)
- [Comparison](#comparison)
- [What's included](#whats-included)
- [Github](https://github.com/meituan/beeshell)
- [Docs](./docs/index.md)
- [Popularize](./docs/popularize.md)

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

## Comparison

在开源之前，我们对业界已经开源的组件库进行了调研，这里对比下 beeshell 与其他组件库的优势与劣势，为大家选择组件库提供参考意见。业界开源的组件库比较多，这里选取 Github Star 数 5000 以上的组件库，从以下几个方面来做对比分析：

| 组件库 | 组件数量 |  通用性 | 定制化 | 文档完善程度 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| react-native-elements | 21 |  强，提供一套风格一致的 UI 控件 | 中，部分可以支持定制化需求 | 高 |
| NativeBase | 28 | 强，提供一套风格一致的 UI 控件 | 中，支持主题变量 | 高 |
| ant-design-mobile | 41 | 强，提供一套风格一致的 UI 控件 | 中，部分可以支持定制化需求 | 高 |
| beeshell | 38（33 组件与 5 工具） | 强，提供一套风格一致的 UI 控件 | 强，不仅支持主题变量，还支持使用继承的方式进行定制化扩展 | 高 |

通过对比可以看出，beeshell 的组件数量并不是最多的，但其他方面都一致或者优于其他产品。基于 beeshell 良好的系统架构，组件数量的丰富只时间问题，而且我们也已经详细的规划了另外的 15+ 组件，包括 Carousel、Collapse、Table 等，来完善数量上的不足。


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
* [Dropdown 下拉菜单](./docs/modules/Dropdown.md)
* [Ruler 刻度尺](./docs/modules/Ruler.md)

#### 复合组件（包含 Native 部分）

因 Native 部分有内部依赖，该部分暂不开源

### 基础工具
* [定制主题](./docs/common/styles.md)
* [动画](./docs/common/animations.md)
* [JS Utils](./docs/common/utils.md)
* [Form 校验](./docs/common/validator.md)
* [Tree 树形结构处理](./docs/common/Tree.md)
