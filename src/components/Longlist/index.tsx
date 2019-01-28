import {
  FlatList,
  Text,
  StyleSheet,
  Platform,
  RefreshControl,
  View,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import variables from '../../common/styles/variables'

const styles = StyleSheet.create({
  loadingIndicator: {
    padding: 10,
  }
})

export interface LonglistProps {
  data?: Array<any>
  total?: number
  renderItem?: Function
  renderFooter?: Function
  onEndReached?: Function
  onRefresh?: Function
  hasRefreshControl?: boolean
  initialNumToRender?: number
}

export class Longlist extends React.Component<LonglistProps, any> {
  private pageNo = 1
  private timeoutId = null

  static defaultProps = {
    hasRefreshControl: true,
    initialNumToRender: 5
  }

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      loading: false,
    }
  }


  componentWillReceiveProps(nexProps) {
    // console.log(nexProps == this.props)
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate')
  }


  onEndReached() {
    const { data, total } = this.props
    if (data && data.length && data.length >= total) {
      return
    }

    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => {
      this.setState({
        loading: true,
      }, () => {
        const pageNo = ++this.pageNo
        const timeoutId = this.timeoutId

        this.props.onEndReached(pageNo).then(() => {
          // console.log(`Load pageNo: ${pageNo} success.`)
          this.setState({
            loading: false
          })
        }).catch((e) => {
          --this.pageNo
          this.setState({
            loading: false
          })
        })
      })
    }, 1000)
  }

  onRefresh() {
    this.setState({
      refreshing: true
    }, () => {
      this.pageNo = 1

      this.props.onRefresh(this.pageNo).then(() => {
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

    let footer = null

    if (this.props.renderFooter) {
      footer = this.props.renderFooter(loading)
    }

    if (footer) {
      return footer
    }

    if (data && data.length && data.length >= total) {
      return <Text style={{ padding: variables.mtdHSpacingXL, color: variables.mtdGrayBase, textAlign: 'center' }}>无更多数据</Text>
    }

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
    return null
  }

  render() {
    const { refreshing, loading } = this.state
    const { data, hasRefreshControl, total } = this.props

    if (!data || !data.length) {
      return null
    }

    const retProps = {
      ...this.props,
    } as any

    if (!hasRefreshControl) {
      delete retProps.refreshing
      delete retProps.onRefresh
    } else {
      retProps.refreshing = refreshing
      retProps.onRefresh = this.onRefresh.bind(this)
    }

    return (
      <FlatList
        {...retProps}
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
