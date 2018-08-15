<p align="center">
    <h3 align="center">Beeshell</h3>

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
- 原生功能支持。组件库中的复合组件包含 Native 代码，支持图片选择、定位等原生功能。
- 功能丰富。不仅仅提供组件，还提供了基础工具、动画以及 UI 规范。
- 完善的文档和使用示例。

## Comparison

在开源之前，我们对业界已经开源的组件库进行了调研，这里对比下 Beeshell 与其他组件库的优势与劣势，为大家选择组件库提供参考意见。业界开源的组件库比较多，这里选取 Github Star 数 5000 以上的组件库，从组件数量、通用性、定制化、是否包含原生功能、文档完善程度五个方面来具体做对比分析：

| 组件库 | 组件数量 |  通用性 | 定制化 | 是否包含原生功能 | 文档完善程度 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| react-native-elements | 16 |  强，提供一套风格一致的 UI 控件 | 弱，若要定制化可能需要重写 | 否 | 高 |
| NativeBase | 28 | 强，提供一套风格一致的 UI 控件 | 中，支持主题变量 | 是 | 高 |
| ant-design-mobile | 41 | 强，提供一套风格一致的 UI 控件 | 中，部分可以支持定制化需求 | 是 | 低 |
| beeshell | 25 | 强，提供一套风格一致的 UI 控件 | 强，不仅支持主题变量，还支持使用继承的方式进行定制化扩展 | 是 | 高 |

通过对比可以看出，Beeshell 只在组件数量上有劣势，其他方面都一致或者优于其他产品。基于 Beeshell 有良好的系统架构，组件数量的丰富只时间问题，而且我们也已经有了详细的规划来完善数量上的不足。


## What's included

### 组件

#### 基础类
* [Button 按钮](./docs/components/Button.md)
* [Tab 组件](./docs/components/Tab.md)
* [Scrollpicker 滚动选择](./docs/components/Scrollpicker.md)

#### 弹窗类
* [Modal 基础弹窗](./docs/components/Modal.md)
* [ConfirmModal 包含标题，取消、确认按钮](./docs/components/ConfirmModal.md)
* [SlideModal 下拉/上拉](./docs/components/SlideModal.md)
* [PageModal 上拉，包含标题以及取消、确认按钮](./docs/components/PageModal.md)
* [ActionSheet 选择面板](./docs/components/Actionsheet.md)
* [Tip 提示信息弹窗](./docs/components/Tip.md)

#### 表单输入类
* [Form 表单](./docs/components/Form.md)
* [Input 输入框](./docs/components/Input.md)
* [Checkbox 多选](./docs/components/Checkbox.md)
* [Radio 单选](./docs/components/Radio.md)

#### 日期类
* [Datepicker 日期选择](./docs/components/Datepicker.md)
* [DatepickerUp 日期数据源扩展](./docs/components/DatepickerUp.md)
* [Calender 日历](./docs/components/Calendar.md)

#### 复合组件（包含 Native 部分）
* [Imagepicker 日历](./docs/components/Imagepicker.md)

#### 其他
* [Cascader 级联菜单](./docs/components/Cascader.md)
* [Longlist 长列表](./docs/components/Longlist.md)
* [Filterpanel 标签筛选组件](./docs/components/FilterPanel.md)
* [SelectPanel 下拉选择组件](./docs/components/SelectPanel.md)

### 基础工具
* [样式规范](./docs/common/styles.md)
* [动画](./docs/common/animations.md)
* [JS Utils](./docs/common/utils.md)
