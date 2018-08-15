# SelectPanel
react native 实现排序筛选组件，可配置，目前仅支持单选，使用有任何不便，尽管戳我。


## Install

```
npm install beeshell 
```

## Usage

```
import { SelectPanel } from 'beeshell';
```

## 示例
暂无

## 用例

```

<SelectPanel
    selectPanelInfo={this.state.selectPanelInfo}
    onSelected={(selectedChoice, selectPanelInfo) => {
        this.setState({
            selectPanelInfo,
            result: JSON.stringify(selectedChoice),
        });
    }}
/>
```

## Props

Prop              | Type   | Optional | Default   | Description
---------------   | ------ | -------- | --------- | -----------
selectPanelInfo   | Array  | Yes      | []        | 一个元素时对象的数组
onSelected        | func   | Yes      |           | 用户点击某个选项后执行的函数
selectedIcon      | element| Yes      |  黄色小勾  | 被选中项右侧图标，默认黄色小勾
selectedTextColor | string | Yes      |  #FECB2E  | 被选中项颜色
panelMaxHeight    | number | Yes      |  271      | panel最大高度，未超过最大高度时按 choiceHeight*choiceNum 算
choiceHeight      | number | Yes      |  45       | 每个choice的高度
textSize          | number | Yes      |  14       | choice的字体大小

### selectPanelInfo 示例数据

```
[{
	"id": 1, // 必传，每个选择的唯一标示
	"text": "创建时间由近到远", //必传 ，选项的文本内容
	"isSelected": true, //可以不传，初始数据中有isSelected为true的值可以设置默认值
}, {
	"id": 2,
	"text": "创建时间由远到近",
	"isSelected": false,
}]
```

## To Do

组件需要完善和规范


