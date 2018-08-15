# TableView

表格组件, 支持数据反转
---

## Install

```
npm install beeshell  
```

## 示例

```
import { TableView } from 'beeshell';
```

### 1. 默认格式

![image](https://s3.meituan.net/v1/mss_c4375b35f5cb4e678b5b55a48c40cf9d/mnpm-demo-pic/tableview_20171214_1.png)

### 2. 自定义格式, 数据极坐标反转

![image](https://s3.meituan.net/v1/mss_c4375b35f5cb4e678b5b55a48c40cf9d/mnpm-demo-pic/tableview_20171214_2.png)


## 表格数据结构
```json
{
  // tableTitle 是 Key: 表头中文
  tableTitle: {
    title: '基础信息',
    yesterDayExposure: '昨日曝光量',
    yesterDayOrderNum: '昨日订单量',
    deliveryFee: '配送费'
  },
  tableDirection: 'column', // column or row 表格数据方向
  // tableData 是 Key: 表格内容
  tableData: [
    {
      title: '黄焖鸡米饭',
      yesterDayExposure: 456,
      yesterDayOrderNum: 34,
      deliveryFee: 12.01
    },
    {
      title: '杨明宇黄焖鸡',
      yesterDayExposure: 3443,
      yesterDayOrderNum: 122,
      deliveryFee: 11.00
    },
  ]
}
```

## Usage


### 1. 默认格式

```js
// constructor
this.state = {
  basicInfo: {
    // 第一个表格
    tableTitle: {
      title: '基础信息',
      yesterDayExposure: '昨日曝光量',
      yesterDayOrderNum: '昨日订单量',
      deliveryFee: '配送费',
      sendPrice: '起送价',
      bussinessOpen: '营业时常',
      fyRate: '非异率',
      tasteScore: '口味评分',
    },
    tableDirection: 'column', // column
    tableData: [
      {
        title: '黄焖鸡米饭',
        yesterDayExposure: 456,
        yesterDayOrderNum: 34,
        deliveryFee: 12.01,
        sendPrice: 33.00,
        bussinessOpen: 12,
        fyRate: 2.3,
        tasteScore: 77,
      },
      {
        title: '杨明宇黄焖鸡',
        yesterDayExposure: 3443,
        yesterDayOrderNum: 122,
        deliveryFee: 11.00,
        sendPrice: 23.00,
        bussinessOpen: 14,
        fyRate: 2.3,
        tasteScore: 77,
      },
    ],
  }
}

// render
<Tableview
  tableTitle={this.state.basicInfo.tableTitle}
  tableData={this.state.basicInfo.tableData}
  tableDirection={this.state.basicInfo.tableDirection}
  border
  flexArr={[3, 2, 2]}
/>

```


### 2. 自定义格式, 数据极坐标反转

```js
// constructor
this.state = {
  otherInfo: {
    // 第一个表格
    tableTitle: {
      title: '店名',
      opentime: '营业时间',
      deliveryFee: '配送费',
      rate: '评价',
    },
    tableDirection: 'row', // column
    tableData: [
      {
        title: '黄焖鸡米饭',
        opentime: '09:00-20:00',
        deliveryFee: 11.00,
        rate: 'A',
      },
      {
        title: '杨明宇黄焖鸡',
        opentime: '11:00-19:00',
        deliveryFee: 11.20,
        rate: 'B+',
      },
      {
        title: '刀削面',
        opentime: '11:00-20:00',
        deliveryFee: 13.00,
        rate: 'B',
      },
      {
        title: '饺子',
        opentime: '09:00-20:00',
        deliveryFee: 11.00,
        rate: 'A-',
      },
      {
        title: '小龙虾',
        opentime: '11:00-20:00',
        deliveryFee: 12.00,
        rate: 'B',
      },
      {
        title: '牛肉面',
        opentime: '09:00-20:00',
        deliveryFee: 15.00,
        rate: 'A-',
      },
    ],
  }
}

// render
<Tableview
  tableTitle={this.state.otherInfo.tableTitle}
  tableData={this.state.otherInfo.tableData}
  tableDirection={this.state.otherInfo.tableDirection}
  border
  borderColor={'#333333'}
  flexArr={[2, 2, 1, 1]}
  title={'评价情况-表格数据纵向-边框颜色'}
/>

```





## Cascader 级联菜单 Attributes

| 参数       | 说明                                        | 类型      | 默认值  | 可选值 |
|------------|--------------------------------------------|-----------|---------------|---------|
|  tableTitle | 表头数据  | object | tableItem |  必填 |
|  tableData | 表格数据 | array[tableItem] |  tableItem | 必填  |
|  tableDirection |  表格数据显示方向  | string   |  column  | column/row |
|  border | 是否显示表格 | array[tableItem] |  true | 可选  |
|  borderColor | 表格颜色 | string |  tableItem | 可选  |
|  flexArr | 各列的相对宽度, 长度要和最大列数一致 | array[number] | [1...1] | 可选  |
|  title | 表格数据 | array[tableItem] |  tableItem | 可选  |

### 注意

* tableTitle 的 tableItem 结构体的 key 的顺序决定了列的先后
* tableDirection 统一个表格设置不同, 显示效果不同.
* flexArr 如果不设置,就会按照当前列数自动均分. 如果设置, 必须和列的数量一致, 注意tableDirection表格数据方向


## TODO
- [ ] 更多的样式支持, table cell的样式, border 更多的样式
