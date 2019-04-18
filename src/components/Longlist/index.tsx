import {
  FlatList,
  FlatListProps,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewStyle,
} from 'react-native'
import React, { ReactElement } from 'react'
import variables from '../../common/styles/variables'

const styles = StyleSheet.create({
  loadingIndicator: {
    padding: 10,
  }
})

export interface LonglistProps extends FlatListProps<any> {
  data: Array<any>
  total?: number
  onEndReached?: any
  onRefresh?: any
  initialNumToRender?: number
}

export class Longlist extends React.Component<LonglistProps, any> {
  flatList = null // 通过 flatList 对象，调用 FlatList 组件相关方法

  static defaultProps = {
    total: 0,
    data: [],
    initialNumToRender: 5
  }

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      loading: false,
    }
  }

  onEndReached() {
    const { data, total } = this.props
    if (data && data.length && data.length >= total) {
      return
    }

    if (this.state.loading) {
      return
    }

    this.setState({
      loading: true,
    }, () => {
      this.props.onEndReached().then(() => {
        this.setState({
          loading: false
        })
      }).catch((e) => {
        this.setState({
          loading: false
        })
      })
    })
  }

  onRefresh() {
    if (this.state.refreshing) {
      return
    }

    this.setState({
      refreshing: true
    }, () => {
      this.props.onRefresh().then(() => {
        this.setState({
          refreshing: false,
        })
      }).catch(() => {
        this.setState({
          refreshing: false,
        })
      })
    })
  }

  renderFooter() {
    const { data, total } = this.props
    const { loading } = this.state

    if (loading) {
      return (
        <View
          style={styles.loadingIndicator}>

          <ActivityIndicator
              size='small'
              color='#333'
          />
        </View>
      )
    }

    if (data && !data.length && total === 0) {
      return <Text style={{ padding: variables.mtdHSpacingXL, color: variables.mtdGrayBase, textAlign: 'center' }}>无数据</Text>
    }

    if (data && data.length && data.length >= total) {
      return <Text style={{ padding: variables.mtdHSpacingXL, color: variables.mtdGrayBase, textAlign: 'center' }}>无更多数据</Text>
    }

    return null
  }

  render() {
    const { refreshing } = this.state
    const { onRefresh } = this.props

    const retProps = {
      ...this.props,
    } as any

    if (!onRefresh) {
      delete retProps.refreshing
      delete retProps.onRefresh
    } else {
      retProps.refreshing = refreshing
      retProps.onRefresh = this.onRefresh.bind(this)
    }

    return (
      <FlatList
        {...retProps}
        ref={(c) => {
          this.flatList = c
        }}
        keyExtractor={(item, index) => {
          return index.toString()
        }}
        initialNumToRender={this.props.initialNumToRender}
        onEndReached={this.onEndReached.bind(this)}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return this.renderFooter()
        }}
      />
    )
  }
}
