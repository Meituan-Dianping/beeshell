---
layout: post
title: beeshell —— React Native 组件库升级 2.0
author: wangxiaolong11@meituan.com
nick: 小龙, 成健
date: 2019-05-09 20:11
status: publish
comments: true
summary: 基于 React Native 的企业级移动应用的基础组件库，beeshell 的开源推广文章，从系统设计、方案实现、质量保证、规划几个方面对组件库进行全面介绍。
tags: [前端, 大零售, 开源, 移动, 稳定性, 跨平台, Android, iOS, React Native, React]
---

# beeshell —— React Native 组件库升级 2.0

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_logo.png)

## 引言

随着 React Native（以下简称 RN） 技术的普及与在公司的全面推广，各个业务方陆续出现了对 RN 组件库的诉求。

在 2018 年 11 月左右，公司内部发起了 RN 组件库建设，旨在提供全公司共用的组件库。如何提供一套通用的组件库，来有效的支撑包括外卖、酒旅以及其他各个事业部的所有业务需求？这对组件库的架构设计、UI 一致性、易用性、扩展性等提出了更高的要求。

因为我们团队在开源 beeshell 1.0（建议阅读[1.0 版本推广文章](https://tech.meituan.com/2018/09/27/waimai-beeshell-popularize.html)）时，积累了丰富的经验，所以作为外卖侧的代表，加入到公司级 RN 组件库的项目共建中。在完成公司级组件库的开发后，我们将共建的成果贡献出来。

我们以 beeshell 升级 2.0 的形式进行开源，在共建成果的基础上，经过进一步的开发与梳理，共计开源 38（33 个组件与 5 个工具）个功能，在服务社区的同时，希望借助社区的力量，进一步完善组件库。

beeshell 2.0 效果图如下：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_rendering.png)

## 系统设计升级

### 协作模式

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_cooperation.png)

整个组件库体系包含三个项目（版本）：MTD 公司通用版本、Roo 外卖定制版本和 beeshell 开源版本。三个版本之间通过 Git Fork 建立依赖关系，源码级的依赖更利于组件的定制化扩展。

- MTD 的关注点是通用性、扩展性、稳定性，所以提供的是基础的、通用的组件，组件扩展性极强。
- Roo 是对 MTD 的继承与扩展，定制了外卖业务的 UI 风格与功能，通用性减弱，功能性和业务性增强，关注功能性、业务性、一致性。
- beeshell（准确的说是 2.0 版本）是对 Roo 的继承与扩展，基本与 Roo 一致，去掉了部分业务组件，关注易用性、一致性、稳定性。

这样设计的原因，是因为组件如果通用性、扩展性强，则功能性、易用性势必较差，然而，我们对公司级组件库的特性要求是：既要通用、稳定、扩展性强，又要易用、功能强大。如何将两个互相矛盾的方面整合？

我们使用了 **关注点分离** 的思维方法，将组件库需要支持的特性合理的分解，分别仔细研究特性的不同侧面（关注点），最后综合各个方面的结果，合成整体的解决方案。

对于用户而言，可以根据自己的业务情况，酌情选择组件库，不同版本的相同组件，底层依赖与实现都是一致的。

协作模式具体流程如下：

- 首先，我们在 beeshell 1.0 的开发以及开源中，积累了丰富的经验，为 MTD 的建设贡献了 50% 的组件。同时，为组件库的共建贡献了许多设计模式与思路，大大加速了组件库的建设。
- 然后，在 MTD 的基础上，定制了外卖主题的组件库 Roo，提升了组件库的业务功能性和易用性。外卖相关的业务项目，在接入 Roo 后直接使用，无需再进行主题的定制与调整。
- 最后，我们将共建的成果贡献出来，升级 beeshell 2.0 并开源。将部分过于业务化的组件移除，保证组件库的易用性与稳定性。

综上所述，以 beeshell 团队为桥梁，建立了公司与开源社区的交流互通的关系，公司与 beeshell 团队以及社区，可以互帮互助，共同建设、进步。

### 架构

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_framework.png)

组件库的架构整体分成四层，包括业务层、组件库体系、RN 层、系统层。本文只介绍下第二层与第三层：

**第二层，组件库体系**

因为三个版本的组件库架构基本一致，这里只详细介绍 beeshell。使用了分层的架构风格，分成了接口层、组件层与工具层。

- 接口层。汇总所有组件，统一输出，使用全部引入的方式，方便组件使用。为了避免引入过多无用组件，用户可以选择按需引入。
- 组件层。细分为原子、分子、扩展组件。我们对组件进行了细粒度拆分，充分利用了继承与组合的代码复用模式。各类组件各司其职，兼顾通用性和易用性、功能性。
- 工具层。通过工具层提供的通用工具，与组件配合实现功能。一方面工具与组件解耦，组件更加简洁，提升组件可维护性；另一方面将工具提供给用户，方便用户开发，提升组件库的功能性。

**第三层，RN 层**

这一层新增了 MRN，MRN 是对 RN 的二次封装。

> MRN 是基于开源的 RN 框架改造并完善而成的一套动态化方案。MRN 从三个方面弥补 RN 的不足：

> - 动态化能力。RN 本身不支持热更新，MRN 借助公司内的 Eva 平台，实现包的上传发布、下载更新、下线回滚等操作。

> - 双端（未来三端）复用问题。从设计原则上要保证，开发者对平台的差异无明显感知。

> - 保障措施。在开发保障方面：提供脚手架工具、模版工程、开发文档等，方便开发者日常的 MRN 开发工作。提供多级分包机制，业务内部和业务之间能够灵活组织代码；在运行保障方面：提供运行环境隔离，使得不同业务之间页面运行无干扰。提供数据采集和指标大盘，及时发现运行中的问题。提供降级能力应对紧急情况。

总之，组件库体系包含完善的测试体系，丰富的代码示例，使用 TypeScript（以下简称 TS）语言进行开发，充分利用 TS 的类型定义与检查，针对每个组件都有详细的文档说明。最终，提供一套通用、易用、稳定、扩展能力强的高质量组件。


## 方案实现优化
### UI 风格一致性

beeshell 延用了 Roo（袋鼠 UI）的 UI 设计规范，其内容涵盖了 PC 端与移动端、Web 平台与 RN 平台，对 UI 与交互给出了详细的视觉规范，旨在保证外卖事业部，产品的 UI 一致性。UI 规范的技术实现方式如下：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_rooTheme.png)

Roo Theme 向下实现了 UI 规范具体内容，向上输出组件样式类、主题变量、样式工具等，供各个组件库以及业务方使用。

Roo Theme 主要使用 Sass 预处理器实现，提供了各个组件的统一样式类，而为了满足不同技术栈的需求，主题变量的输出，提供了 CSS、JavaScript（以下简称 JS）、Less、Sass、Stylus 多种语言实现，不同平台、技术栈可以根据情况自由选择。

UI 风格的一致性，具体包括样式一致性和动效一致性。下文详细介绍：

#### 样式一致性

样式一致性，又可以细分为色彩和排版。

首先，介绍下色彩部分。在 APP 应用中，色彩元素扮演的角色仅次于功能。人与计算机的互动，主要是与图形用户界面（GUI）的交互，而色彩在该交互中起着关键作用。它可以帮助用户查看和理解界面内容，与正确的元素互动，并了解相关操作。每个 APP 都会有一套配色方案，并在主要区域使用其基础色彩。

正因为有无数种色彩组合的可能，在设计一个 APP 时，人们的配色方案也有无数种选择。本文不纠结于如何选择一个好的配色方案，而是介绍一个配色方案应该具有哪些元素。

一套完整的配色方案，应该包括品牌主色、品牌功能色、中性色。本文以 beeshell 的配色方案举例说明。

*色彩：品牌主色*

品牌主色应该是应用中出现最频繁的颜色，通常用来强调 UI 中的关键部分的颜色。beeshell 的品牌主色色值为 `#ffd800`，如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_primary.png)

有时，一个品牌主色并不能够支撑所有的应用场景，此时，可以通过加深或者变浅主色的方式，再增加几个色值，beeshell 的品牌主色还包括一个加深的色值 `#ffa000`，用于某些组件的激活状态，如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_primaryDark.png)

*色彩：品牌功能色*

功能色的内容与使用场景如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_function.png)


*色彩：中性色*

中性色（灰度）的内容与使用场景如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_gray.png)

然后，介绍排版，排版包括字体、间距、边线。

*排版：字体*

beeshell 的字体尺寸（Font Size）集，是基于 12、14、16、20 和 28 的排版比例，如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_fontSize.png)

对于字重（Font Weight），只使用正常 `normal` 和加粗`bold` 两种，避免了因为不同字体家族（Font Family），对字重的支持范围不同，而导致视觉差异。

除了字体尺寸和字重，影响排版的还有字体行高（Line Height）。为了达到适当的可读性和阅读流畅性，字体行高，需要根据字体的大小和粗细来设定。经过测试，RN 应用在默认情况下，行高约等于字体大小乘以 1.2，如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_lineHeight.png)

> 注意：对于中文字体，字体尺寸与行高的比例并不是 1:1.2。

*排版：间距*

间距是 UI 元素与元素之间、父元素与子元素之间的空白区域，一个应用排版风格一致性，很大程度取决于间距。一个组件的最终宽高，应该由内容、内边距以及边框决定，是自适应的，而不应该直接定义宽高。

对于同一个 APP，间距应该在一个合适的范围取值，可以通过定义『小号间距』、『中号间距』、『大号间距』等来划分信息层次。例如 beeshell 的 Button 组件，有三种尺寸。实现效果如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_spacing.png)

*排版：边线*

边线（边框）部分，需要统一元素的边框宽度、颜色和圆角，边线虽然对 UI 风格的影响较小，但是不可或缺。beeshell 使用的边框宽度为一个物理像素，使用 RN 提供的 `StyleSheet.hairlineWidth` 接口实现；定义了三种灰度的边框颜色；主要使用 2px 的圆角。

最后，样式的一致性，还涉及到图标、布局等相关内容，这里不做详细介绍，如有需要可以参考 MATERIAL DESIGN。

#### 动效一致性

动效展示了应用的组织方式和功能。

动效可以：

- 引导用户在视图中的视觉焦点
- 提示用户完成手势操作后会发生什么
- 暗示元素间的等级和空间关系
- 让用户忽视系统背后发生的事情（比如抓取内容、或加载下一个视图）
- 使应用更有个性、更优雅、更令人愉悦

beeshell 组件库基于 Animated 进行了二次封装，提供 FadeAnimated 和 SlideAnimated 两个动画类，支持淡入淡出动画和滑动动画，可以使用策略模式集成到任何组件中。

beeshell 将逐渐在所有的组件集成这两种动画，保证动效的一致性，下文展示下已经实现了动画的组件，先睹为快。

Button 组件使用 FadeAnimated 类实现动画，动效如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_animatedButton.gif)

Modal 组件使用 FadeAnimated 类实现动画，动效如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_animatedModal.gif)

Dropdown 组件使用 SlideAnimated 类实现动画，动效如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_animatedDropdown.gif)


总之，beeshell 通过样式和动效两个方面，进行 UI 一致性的优化。

- 样式一致性的保证。主要通过定义全局性的主题变量，供所有组件使用，同时，提供了自定义主题变量的接口，可以实现一键换肤（下文图 E）。使用“内部样式 < 主题 < 扩展样式”的样式优先级覆盖策略，保证了样式部分的定制能力（在下文“定制化能力分级设计”章节中详细介绍）。

- 动效一致性的保证。一方面，依赖主题变量中定义的动画开关变量，主要考虑到一些低端 Android 机器的性能问题，用户可以选择性关闭某个组件的动画；另一方面，依赖组件库的良好分层设计，将动画类独立实现，可以使用策略模式，方便的集成到任意组件中。

一键换肤的效果如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_theme.png)

### 定制化能力分级设计

要开发一套全公司共用的组件，需要同时满足酒旅、外卖 C 端、外卖 B 端以及外卖 M 端等业务的需求，这对定制化能力提出了更高的要求。

为了进一步增强组件的定制化能力，同时，避免属性（API）的无节制增加，进而导致组件难以维护，我们设计了定制化能力分级的策略。

这里以一个常见的业务场景：底部滑出弹框，来举例说明分级设计。

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_customize1.png)

如上图所示：第一个例子比较通用、规范，“区域文字内容”的文字与样式需要支持自定义；第二个例子，需要支持多行文字以及图标，即“区域内容”需要支持自定义；第三个例子，自定义的重点，由区域以及区域内部，转移到区域之间的布局，“区域布局”需要支持自定义。

这三个例子，大概可以涵盖，当前业务场景的所有定制化需求了。针对这些需求，我们实现了一个 BottomModal 底部弹框组件，具体实现方式如下：

#### 第一级定制化，定制主题变量

“完成”文本的颜色，使用的是主题变量定义的品牌主色（Brand Primary Dark），beeshell 默认的品牌主色为黄色。

通过组件库提供的自定义主题变量的接口，可以修改品牌主色的色值，进而修改了“完成”文本的颜色。“取消”、“标题”的颜色修改同理。

修改品牌主色，影响范围很大，所有组件的色彩风格统一变化，如果我只想把文本的颜色改成红色，但是并不想修改品牌主色，应该如何定制呢？可以使用第二级定制化。

#### 第二级定制化，提供定制属性

这里提供 labelText 和 labelTextStyle 属性，如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_customize2.png)

代码实现为：

```
<Text style={this.props.labelTextStyle}>{this.props.labelText || '完成'}</Text>
```

labelText 用于定制文案内容，将 labelTextStyle 整体暴露出来，而不是只暴露颜色单个属性，这样的好处有两点：

- 开发者都熟悉 style 这个名称与用法，但并不知道 xxxColor 是什么，组件更加易用。
- style 不仅可以定制 color，还支持 fontSize、fontWeight 等属性，定制能力更强。

以上两级主要是样式部分的定制，使用了样式优先级覆盖的策略，扩展样式（labelTextStyle）覆盖主题，主题覆盖内部样式。

下一步，就是对于多行文字、图标的支持。

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_x1.png)


#### 第三级定制化，开放渲染区域

提供 labe 属性，属性值为一个 ReactElement 对象，任意定制 UI，如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_customize3.png)


到这里，区域以及区域内部的定制化需求，就都可以满足了，但是区域布局的定制化，因为布局情况太多，并不容易实现。

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_x2.png)

我觉得这种产品需求，还是挺合理的，如果不能支持，似乎说不过去。

如果再提供几个属性，用于定制布局方式、头部边框样式、底部按钮，按照这种方式，属性会无节制增加，势必造成组件难以维护，易用性也会大打折扣。那应该如何实现？我们设计了第四级。

#### 第四级定制化，继承/组合基类

在 beeshell 1.0 的开源推广文章中也有讲到过，我们在组件库开发之初，对常见组件，进行了全面的梳理，在比较细的粒度，对组件进行拆分，以继承的方式，层层依赖，以功能渐进式增强的方式，实现各个组件。

这样使得开发者，可以在任意层级上继承、组合组件，进行定制化开发，提供了极强的扩展能力。具体实现如下：

首先，组件库实现一个 SlideModal 组件，这是一个比较底层、基础的组件，功能相对少，支持多个方向的滑动动画，内容完全由开发者自定义，通用性、定制化能力极强。实现效果如下：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_customize4-1.gif)

然后，组件库实现了 BottomModal 组件，继承 SlideModal，固定滑动的方向和开始位置，弹框内容横向拉伸至全屏、纵向自适应，功能增强而定制化能力减弱。实现效果如下：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_customize4-2.gif)

前文已经讲到，产品需求已经超出了 BottomModal 定制化的能力，强行实现只会带来不良后果。所以，我的方式是组合使用 SlideMdoal，开发一个新的组件，也就是第四级定制化。新组件的实现效果如下：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_customize4-3.gif)

第四级定制化，是使用了新的思路，不再盲目的增加一个组件的功能，来帮助开发者满足产品需求，而是提供了基础工具，基础工具实现了底层、复杂的部分，表现层的部分则让渡给开发者，用户自己实现，“授人以鱼不如授人以渔”。

通过四个级别的定制化的能力，轻松搞定所有的产品的需求。

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_x3.png)

### 功能丰富强大

功能丰富强大，通过两个方面体现：一个是组件丰富度，一个是组件能力。

beeshell 目前已提供的功能有 38（组件 33、基础工具 5）个，并且详细规划了另外的 15+ 组件，会陆续开源，在组件数量上有极大优势，同时，支持全部引入和按需引入，可以避免打包过多无用代码。

单个组件应该具备哪些能力？对于常见的组件，我们参考业界的标杆项目，与其保持一样的能力，例如，antd 的 Slider 组件，支持横向和纵向滑动，beeshell 也会支持。对于业务下沉组件，都通过了多个业务场景的验证，组件的稳定性、支撑业务的能力都无可挑剔。我们通过参考标杆、多业务场景验证来保证组件的强大能力。

#### 组件能力展示

SlideModal 滑动弹框组件，支持 12 个滑动方向，支持 4 个触控区域，组件实现原理分析如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_principleSlideModal.png)

实现 SlideModal 有几个难点：

- 固定定位（position fixed），即相对屏幕来定位。
- 动画开始位置与方向
- 屏幕的局部与全部覆盖

在 RN 中并没有固定定位的概念，这使得相对屏幕来定位难以实现，要实现弹框交互，就必须解决固定定位的难题。

beeshell 采取在根元素添加一个兄弟节点（RootSiblings）的方式，实现了 Topview 组件，Topview 实例（图 N-1 的红色部分）在初始化后，会覆盖在所有页面元素的上方，其 zIndex 可以自定义，默认值为 100，同时实例只是作为布局容器，并不会阻断交互，基于 pointerEvents 属性实现。

SlideModal 作为 Topview 实例的子元素，进行展示、布局与交互，图 N-1 红色区域之上的部分就是 SlideModal 组件，包含 4 个触控区域以及弹框内容区域。

动画的开始位置，通过提供 offsetX 和 offsetY 属性即可，但在指定开始位置后，滑动的方向情况则比较多，一共有 12 个方向，如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_directionSlideModal.png)

在一个区域中有 3 个方向，4 个区域共 12 个方向。

内容区域的 Z 方向向下一层，是触控区域 1（结合图 N-1 和 N-2 理解），也就是我们常说的遮罩（Backdrop），通常要求在点击遮罩时关闭弹框。

然而，对于触控区域 2、3、4，是否有遮罩层，则要根据应用场景来定。所以，SlideModal 提供了相关属性，可以分别定制这三个区域的交互行为。如果设置三个区域都有遮罩层，则屏幕全部覆盖，无法与弹框之下的元素交互，否则屏幕局部覆盖，在没有遮罩的区域可以击穿弹框。

SlideModal 效果图如下：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_renderingSlideModal.gif)


除了 SlideModal 之外，还有其他功能强大的组件：Slider 滑块组件，支持纵向和横向滑动；Rate 评分组件，实现一套滑动评分的机制，支持定制任意 UI 元素。由于篇幅有限，在此不再赘述。

### 易用性提升

组件易用性的提升，通过命名和文档这两方面来保证。

#### 命名

命名包括组件名、属性与方法名。

一个组件，实际上就是 Web 页面或者 APP 中的元素、控件，通常因为原生控件的能力薄弱，而进行二次封装，所以组件名与原生控件名的名称，尽量保持一致。例如，Form 与 HTML form 标签一致，Switch 从 iOS 控件 UISwitch 中得来。这样的命名，可以给与开发者更加直观的感受，通过名称就能知道组件大概的 UI 与功能，降低学习和使用的成本。

属性与方法的命名，既要考虑原生控件的属性名，又要考虑组件库命名的一致性。例如，表单录入的相关组件，包括 Input、Radio、Checkbox、Switch 等，组件的值要统一使用 value 命名，值变化的回调使用 onChange，选中状态使用 checked 布尔类型。这样符合用户的直观感受，更加易用，降低使用成本。

常用属性名举例如下：

| 属性名 | 类型 | 描述 |
| ---- | ---- | ---- |
| style | ViewStyle/TextStyle | 组件样式，通常作为组件的第一个子节点的样式属性 |
| data | any[] | 数据源，数据源的元素通常是对象 `{ label: string, value: any, [props: string]: any }` label 作为展示文案，value 作为元素唯一标志，以及其他属性 |
| value | any | 值 |
| onChange | Function | 值变化回调 |
| onPress | Function | 点击事件 |
| renderItem | Function | 自定义渲染项 |

#### 文档

文档规定了统一的格式，旨在全方位介绍组件，方便开发者使用，格式内容如下：

- 组件名称。
- 组件描述。
- 引入方式，包括全部、按需两种引入方式。
- 示例演示，动图与静图。
- 示例代码，使用伪代码，言简意赅，能说明使用方式即可，同时，附有完整示例代码的链接。
- API 说明，分成 Props 和 Methods 两部分。
    - Props 包含 Name | Type | Required | Default | Description。
    - Methods 格式借鉴 RN 官方文档格式。


## 测试

业务开发的目的不仅是实现需求，还要保证研发质量，尤其是对公共组件库来说，尤为重要。测试是为了提高代码质量和可维护性，是实现代码的第二个目标的一种方法。

beeshell 1.0 中已经集成了“黑盒测试”与“白盒测试”。beeshell 2.0 在原有的基础上，进行了一定程度的优化，代码的可靠性与安全性，仍然保持最高级别，而测试覆盖率则由原来的 70% 提升到了 80% 以上，使用 SonarQube 的分析统计结果如下图：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_sonarqube.png)

不仅如此，beeshell 2.0 在测试领域继续探索，集成了“灰盒测试”，基于开源方案 Detox 实现。

> 灰盒测试，是介于白盒测试与黑盒测试之间的一种测试，灰盒测试多用于集成测试阶段，不仅关注输出、输入的正确性，同时也关注程序内部的情况。灰盒测试不像白盒那样详细、完整，但又比黑盒测试更关注程序的内部逻辑，常常是通过一些表征性的现象、事件、标志来判断内部的运行状态。

灰盒测试效果如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_e2e.gif)

通过黑盒测试、白盒测试、灰盒测试，三种测试方案，更加全面的保证组件库的代码质量，大大提高了代码可维护性。


## 开发调试

受益于 MRN 平台，使得 JS 代码与 Native 代码完全分离。

beeshell 源码工程，包含了包括组件源码、示例代码、测试文件在内的全部 JS 代码，Native 部分则只负责打包生成容器（本文以美团 APP 举例说明），通过下载并安装 .app（iOS）或者 .apk（Android） 文件至模拟器，直接加载本地服务提供的 jsbundle，快速进入开发调试。

前端开发再也不用关心 Native 的部分，无需耗时耗力的维护 Native 环境、依赖，极大降低了前端开发成本。开发调试流程如下图所示：

![image](//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:db7f371d/beeshell2.0_develop.png)


## 未来规划

我们的目标是把 beeshell 建设成为一个大而全的组件库，不仅会不断丰富 JS 组件，而且会不断加强复合组件去支持更多的底层功能。因为我们支持全部引入和按需引入两种方式，用户不需要担心会引入过多无用组件而使得包体积过大，影响开发和使用效率。

我们为组件库发展规划了三个阶段：

- 第一阶段，beeshell 1.0 版本，开源 20+ 组件，主要提供基础功能。
- 第二阶段，对我们在开发 React Native 应用几年时间积累的组件进行整理，同时参考业界的标杆项目，开源 50+ 组件。
- 第三阶段，调研移动端 APP 常用的功能，分析与整理，然后在 beeshell 中实现，开源 100+ 组件。

此次 beeshell 2.0 升级，共计开源 38（33 个组件与 5 个工具）个功能，而且已经详细的规划了另外的 15+ 组件，也会在近期开源，目前处于第二阶段的收尾阶段。

第三阶段的建设，也在紧锣密鼓的筹备当中，要实现 100+ 组件任务十分艰巨，希望大家踊跃参与，共同建设。


## 开源相关

### Github 地址

[beeshell](https://github.com/Meituan-Dianping/beeshell)

### 核心贡献者

[小龙](https://github.com/wxlworkhard)，[泽楠](https://github.com/weirDozzz)，轶超，宋鹏，[孟谦](https://github.com/mactive)


## 参考资料

- [beeshell 1.0 开源推广文章](https://tech.meituan.com/2018/09/27/waimai-beeshell-popularize.html)
- [MATERIAL DESIGN](https://material.io/)
