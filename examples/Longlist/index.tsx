import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  PixelRatio,
  FlatList,
  RefreshControl,
} from 'react-native'


import { Longlist } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'

export default class LonglistScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: null,
      pagesize: 5,
    }
  }

  getList(params) {
    const { pageNo, pagesize } = params

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          total: 10,
          data: [
            {
              id: 1
            },
            {
              id: 2
            },
            {
              id: 3
            },
            {
              id: 4
            },
            {
              id: 5
            },
            {
              id: 6
            },
            {
              id: 7
            },
          ]
        })
      }, 1000)
    }).catch((e) => {
      console.log(e)
    })
  }

  refreshState(pageNo) {
    const params = {
      pageNo: pageNo || 1,
      pagesize: this.state.pagesize,
      id: '123456',
    }

    console.log('getList by pageNo:', pageNo)
    return this.getList(params).then((resData) => {
      const { data, total } = resData
      const list = data.map((item) => {
        return {
          ...item,
          label: `第 ${params.pageNo} 页，第 ${item.id} 项`,
        }
      })

      this.setState({
        total,
        list: (pageNo === 1 ? [] : this.state.list).concat(list),
      })
    }).catch(() => {
      this.setState({
        list: this.state.list.concat()
      })
    })
  }


  componentDidMount() {
    this.refreshState(1).catch((e) => {
      console.log(e)
    })
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate')
  }


  render() {
    const { list, pagesize, total } = this.state
    let textInfo
    if (!list) {
      textInfo = '加载中...'
    }

    if (list && !list.length) {
      textInfo = '无数据'
    }
    if (textInfo) {
      return (
        <View style={[styles.body]}>
          <View style={{ paddingVertical: 12, alignItems: 'center' }}>
            <Text style={{ color: variables.mtdGrayBase }}>{textInfo}</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.body}>
        <Longlist
          total={total}
          data={list}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginBottom: 12,
                  paddingVertical: 30,
                  paddingHorizontal: variables.mtdHSpacingXL,
                  backgroundColor: '#fff'
                }}>
                <Text style={{ color: variables.mtdGrayBase }}>{item.label}</Text>
              </View>
            )
          }}
          hasRefreshControl={true}
          onEndReached={this.refreshState.bind(this)}
          onRefresh={this.refreshState.bind(this)}
        />
      </View>
    )
  }
}




