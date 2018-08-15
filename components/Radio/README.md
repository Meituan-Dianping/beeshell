# @mfe/react-native-radio
---

## Install

```
npm --registry=http://r.npm.sankuai.com install @mfe/react-native-radio
```

## 示例
###全选和默认选中
![image](https://s3.meituan.net/v1/mss_c4375b35f5cb4e678b5b55a48c40cf9d/mnpm-demo-pic/radio_20171020.gif)


## Usage

### 1. 默认选中
```js

import Radio from '@mfe/react-native-radio';

// constructor
this.state = {
  checkedValue: '选项B',
}

// handle
handleRadioValue(value) {
  this.setState({
    radioValue: value,
  });
}

// render
// 如果有trueValue, 取 trueValue的值
<Radio label="选择单选项(默认选择'选项B')" checkedValue={this.state.checkedValue} onChange={this.handleRadioValue.bind(this)}>
  <Radio.Item key={'a'} label="选项A" trueValue="A的值" />
  <Radio.Item key={'b'} label="选项B" />
  <Radio.Item key={'c'} label="选项C" />
</Radio>

```

### 2. 显示全选, 并配合Form.Item 使用
```js
import Radio from '@mfe/react-native-radio';
import Form from '@mfe/react-native-form';

// handle

handleRadioChange(value) {
  this.setState({
    radioValue: value,
  });
}

// render 
// 设置 isBlock 控制样式
// disabled 不允许选择
// iconPosition 对齐方式
<Form.Item prop="accountType" isBlock>
  <Radio label="选择单选项" iconPosition={'right'} onChange={this.handleRadioChange.bind(this)}>
    <Radio.Item key={'a'} label="对公" />
    <Radio.Item key={'b'} label="个人" disabled />
    <Radio.Item key={'c'} label="其他" />
  </Radio>
</Form.Item>
```


## Radio.Item Attributes

| 参数       | 说明                                        | 类型      | 默认值  | 可选值 |
|------------|--------------------------------------------|-----------|---------------|---------|
|  label    |   显示用标题,默认也是选中的值. 如果不设置trueValue,不可以出现重复  | string | 选项 |  -- |
|  trueValue |  选中后真正的值, 不可以出现重复 | any   |  null | --  |
|  disabled |  是否禁用                           | bool   |  false | -- | 
|  checked |  是否默认选中, 仅在Radio.Item单独使用时起作用. 如果有<Radio>包裹, 请使用Radio的checkedValues属性     | bool   |  false | -- | 
|  hasLine |  是否有下划线                            | bool   |  true | -- | 
|  color |  主题色, 默认袋鼠黄 #FECB2E                           | string   |  无 | -- | 


## Radio Attributes

| 参数       | 说明                                        | 类型      | 默认值  | 可选值 |
|------------|--------------------------------------------|-----------|---------------|---------|
|  label    |   整个Radio的标题                            | string 或 ReactElement      | 选择项 |  -- |
|  checkedValue | 默认选中的值, 其中的值就是Radio.Item 的 label || trueValue | array   |  选项 | --  |
|  iconPosition |  选项扭icon 位置                           | string   |  left | left,right | 


## Radio Events

| 事件名称       | 说明                                        | 回调参数    |
|------------|--------------------------------------------|-----------|
|  onChange    |  当选中值变化时触发的事件,参数是值的数组 | array |




## Important
* <Radio.Item> value =  trueValue || label 不允许有重复的值
* trueValue 优先级高于label


## TODO
- [ ] inline 开发方式
- [ ] 和 Form.item 校验配合使用
- [ ] 支持设置一组值的情况 调用一个方法自动生成
- [ ] Android 兼容性测试
