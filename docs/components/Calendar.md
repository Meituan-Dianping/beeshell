# Calendar

日历组件数据层逻辑独立出来，使用 utils 方式集成进来，为跨平台提供便利。

## Install

```
npm install @mfe/beeshell --registry=http://r.npm.sankuai.com
```

## Usage

```
import { Calendar } from '@mfe/beeshell';
```


### Examples

![image](../images/Calendar/1.gif)

### Code

```jsx
import { Calendar } from '@mfe/beeshell';

class App extends React.Component {
  render() {

      return (
          <View style={{flex: 1, backgroundColor: '#ebebea'}}>
              <Text>{this.state.date}</Text>
              <View style={{marginVertical: 50}} >
                  <Calendar
                      date={this.state.date}
                      startDate={'2018-04-11'}
                      endDate={'2018-06-22'}
                      onChange={(date) => {
                          this.setState({
                              date
                          });
                      }}>
                  </Calendar>
              </View>
          </View>
      );
  }
}
```

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| date | String | false | 当天 | 日期值 |
| startDate | String | false | null | 可以选择的最小日期 |
| endDate | String | false | null | 可以选择的最大日期 |
| onChange | Function | false | null | 日期修改的回调 |
| renderItem | Function | false | null | 每个日期的渲染方式 |
| renderHeader | Function | false | null | 渲染组件header部分 |
| renderWeekDay | Function | false | null | 星期日-星期一的渲染 |



### 自定义渲染方法

| props         | 入参                                                         | 需要的返回值  |
| ------------- | ------------------------------------------------------------ | ------------- |
| renderItem    | 1. 待渲染的日期<br />`Object {dateModel: moment 实例, formattedDate: 'YYYY-MM-DD'格式的时间字符串}`<br />2. date 当前日历时间, moment 对象 | React Element |
| renderHeader  | 1. date 当前日历时间, moment 对象<br />2. changeDate(type, method), 用于修改日历时间, `type: 'day', 'month', 'year', method: add 或者 subtract` | React Element |
| renderWeekDay | weekday: '日', '一'…'六'                                     | React Element |

### 自定义渲染例子

``` react
import { Calendar } from '@mfe/beeshell';

class App extends React.Component {
  renderItem = (item, date) => {
    return (
    	<Text>
      	{ item.dateModel.format('DD') }
      </Text>
    )
  }
  renderHeader = (date, changeDate) {
    return (
      <View>
        <Button onPress={() => changeDate('month', 'subtract')}>
          -
        </Button>
      	<Text>
          { date.format('YYYY年MM月DD日') }
        </Text>
        <Button onPress={() => changeDate('month', 'add')}>
          +
        </Button>
      </View>
    )
  }
	renderWeekDay = (weekday) => ( <Text>周{weekday}</Text>	 )

  render() {
      return (
          <View style={{flex: 1, backgroundColor: '#ebebea'}}>
              <Text>{this.state.date}</Text>
              <View style={{marginVertical: 50}} >
                  <Calendar
                      date={this.state.date}
                      startDate={'2018-04-11'}
                      endDate={'2018-06-22'}
                      onChange={(date) => {
                          this.setState({
                              date
                          });
                      }}
                    	renderItem={this.renderItem}
                    	renderHeader={this.renderHeader}
                    	renderWeekDay={this.renderWeekDay}
                    >
                  </Calendar>
              </View>
          </View>
      );
  }
}
```

