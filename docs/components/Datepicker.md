# Datepicker

滚动选择日期组件，该组件使用 [Scrollpicker](./Scrollpicker.md) 组件做滚动选择、布局，主要完成了日期数据源的处理。可以借鉴 Datepicker 的实现，制作数据处理更为复杂的组件。

## Install

```
npm install @mfe/beeshell --registry=http://r.npm.sankuai.com
```

## Usage

### 引入方式
#### 全部引入
```
import { Datepicker } from '@mfe/beeshell';
```
#### 单独引入

```
import Datepicker from '@mfe/beeshell/components/Datepicker';
```
因为该组件库实现使用了继承、组合等方式复用代码，组件又有通用型、业务型组件的分类，所以导致单独引入的路径会比较长。

### Examples

![image](../images/Datepicker/1.gif)


### Code

```jsx
import { Datepicker } from '@mfe/beeshell';

class App extends React.Component {
  const date = '2018-01-01';

  return (
      <View style={{flex: 1, backgroundColor: '#ebebea'}}>
          <View style={{marginVertical: 50}} >
              <Datepicker
                  startYear={2010}
                  numberOfYears={10}
                  date={date}
                  onChange={(data) => {
                      console.log(data);
                  }}
              />
          </View>
      </View>
  );
}


```

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| startYear | Number | true | null | 开始年份 |
| numberOfYears | Number | true | null | 年数 |
| date | String | false | null | 日期字符串，'YYYY-MM-DD' 格式 |
| onChange | Function | false | null | 数据变化回调|
