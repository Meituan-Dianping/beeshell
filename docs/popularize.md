# beeshell 2.0

## 引言
2018 9 月开源，11 月内部发起 rn 组件库建设，旨在提供全集团共用的 rn 组件库，对 UI 统一、架构设计、易用性、扩展性提出更高要求

## 系统设计升级

xxxxx

![image](../images/popularize/framework.jpeg)

业务 -> 组件库（mtd->roo->beeshell） -> mrn/rn -> iOS/Android


## 方案实现优化
### UI 风格一致性

UI 风格的一致性，包括样式一致性和动效一致性。

#### 样式一致性

样式一致性，又可以细分为颜色和排版，首先介绍下颜色部分。

在 APP 应用中，色彩元素扮演的角色仅次于功能。 人与计算机的互动，主要是与图形用户界面（GUI）的交互，而色彩在该交互中起着关键作用。 它可以帮助用户查看和理解 APP 内容，与正确的元素互动，并了解相关操作。每个 APP 都会有一套配色方案，并在主要区域使用其基础色彩。

正因为有无数种色彩组合的可能，在设计一个 APP 时，人们的配色方案也有无数种选择。本文不纠结于如何选择一个好的配色方案，而是介绍一个配色方案应该具有哪些元素。

一套完整的配色方案，应该包括品牌主色、品牌功能色、中性色。本文以 beeshell 的配色方案，举例说明。

**品牌主色**

品牌主色应该是应用中出现最频繁的颜色，通常用来强调 UI 中的关键部分的颜色。beeshell 的品牌主色色值为 `#fecb2e`，如下图所示：

![image](../images/popularize/primary.png)

有时，一个品牌主色并不能够支撑所有的应用场景，此时，可以通过加深或者变浅主色，再增加几个色值，beeshell 的品牌主色还包括一个加深的色值 `#ffa000`，用于某些组件的激活状态，如下图所示：

![image](../images/popularize/primaryDark.png)

**品牌功能色**

![image](../images/popularize/function.jpeg)

**中性色**

![image](../images/popularize/gray.jpeg)

![image](../images/popularize/theme.jpeg)
### 定制化能力分级设计
### 功能丰富强大
### 易用性
### 功能边界清晰


# 测试
在 1.0 已经继承了黑盒测试、白盒测试，在 2.0 我们集成了灰盒测试

什么是灰盒测试？xxxx

效果图

# 开发调试
mrn

#未来规划
50+
100+

# 参考资料

- MATERIAL DESIGN：https://material.io/