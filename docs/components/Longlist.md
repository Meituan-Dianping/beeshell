# Longlist

基于 FlatList 的长列表组件，支持下拉刷新，上拉加载更多。


## Install

```
npm install @mfe/beeshell --registry=http://r.npm.sankuai.com
```

## Usage

```
import { Longlist } from '@mfe/beeshell';
```


### Examples

![image](../images/Longlist/1.gif)

### Code

```jsx
import { Longlist } from '@mfe/beeshell';

class App extends React.Component {
    componentDidMount() {
        this.refreshState(1);
    }

    refreshState(pageNo) {
        const params = {
            pageNo: pageNo || 1,
            pagesize: this.state.pagesize,
            id: '123456',
        };

        return this.getList(params).then((resData) => {
            const { data } = resData;

            const list = data.map((item) => {
                return {
                    ...item,
                    label: `${item.label}--pageNo: ${params.pageNo}`,
                };
            });

            this.setState({
                list: (pageNo == 1 ? [] : this.state.list).concat(list),
            });
        });
    }

    render() {
      const { list } = this.state;
      return (
          <Longlist
              data={list}
              renderItem={({item, index}) => {
                  return (<Text>{item.label}</Text>);
              }}
              hasRefreshControl={true}
              onEndReached={this.refreshState.bind(this)}
              onRefresh={this.refreshState.bind(this)}
          />
      );
    }
}


```

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| data | Array | true | [] | 数据源 |
| renderItem | Function | true | null | 渲染内容 |
| hasRefreshControl | Boolean | false | true | 是否可以下拉刷新 |
| onEndReached | Function | false | null | 滚动到底部回调 |
| onRefresh | Function | false | null | 下拉刷新回调 |
