# FilterPanel
react native 实现标签筛选组件，数据可配置，支持单选和多选，一般截个popup来使用，使用有任何不便，尽管戳我。

*注意*
- 1.4.1版本中引用的PropTypes来自"prop-types"
- 1.2.1版本中引用的PropTypes来自"react"

## Install

```
npm install beeshell  
```

## 示例

```
import { FilterPanel } from 'beeshell';
```

## 示例
暂无

## 用例

```

 <FilterPanel
    filterPanelInfo={this.state.filterPanelInfo}
    onConfirm={(result, filterPanelInfo) => {
        this.onFilterConfirm(result);
        // 配合popup来使用时需要在完成选择后设置一下filterPanelInfo 来进行下一次的回显，因为popuphide会销毁这个组件
        this.setState({
            filterPanelInfo,
        });
    }}
/>
```

## Props

Prop               | Type   | Optional | Default     | Description
---------------    | ------ | -------- | ---------   | -----------
filterPanelInfo    | Array  | Yes      | []          | 一个元素是对象的数组
onClear            | func   | Yes      |             | 用户点击清楚条件按钮的回调函数
onConfirm          | func   | Yes      |             | 用户点击确定时的回调函数
panelHeight        | number | Yes      |             | panel的固定高度
panelMaxHeight     | number | Yes      | 屏幕高度-124 | panel最大高度，当设置了panelHeight时，panelMaxHeight = panelHeight
panelMinHeight     | number | Yes      |  0          | panel最小高度，当设置了panelHeight时，panelMinHeight = panelHeight
selectedBlockStyle | object | Yes      |  有默认样式  | tag被选中时容器样式
selectedTextStyle  | object | Yes      |  有默认样式  | tag被选中时文本样式
hasCommonLabals    | bool   | Yes      |  false  | 是否有常用便签功能
modyfyCommonLabels | func   | Yes      |  false  | 更新常用便签
commonLabels       | Array  | Yes      |    []   | 常用便签数据
activeExpand       | bool   | Yes      |  false  | 是否开始折叠功能

### filterPanelInfo 示例数据

```
[{
    "category_name": "门店品类",
    "items": [{
      "label_name": "美食",
      "label_id": "1000"
    }, {
      "label_name": "甜点饮品",
      "label_id": "19"
    }, {
      "label_name": "生活超市",
      "label_id": "20"
    }, {
      "label_name": "生鲜果蔬",
      "label_id": "21"
    }, {
      "label_name": "医药健康",
      "label_id": "22"
    }, {
      "label_name": "鲜花绿植",
      "label_id": "1001" //id 必须唯一
    }],
    "category_id": "11", //id 必须唯一
    "support_muti_choice": 0 // 0是单选，1是可多选
}]

```

## To Do

> * 样式可定制化程度更高
> * 增加皮肤


