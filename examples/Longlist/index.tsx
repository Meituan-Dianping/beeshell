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

const dataModal = {
  total: 100,
  list: [
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
}


export default class LonglistScreen extends React.Component {
  private longlist = null

  constructor(props) {
    super(props)

    this.state = {
      pageNo: 1,
      pagesize: 7,
    }

    this.state.list = this.modifyList(dataModal.list, this.state.pageNo)
    this.state.total = dataModal.total
  }

  getList(params) {
    const { pageNo, pagesize } = params

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dataModal)
      }, 3000)
    }).catch((e) => {
      console.log(e)
    })
  }

  modifyList(list, pageNo) {
    return list.map((item, index) => {
      return {
        ...item,
        label: `第 ${pageNo} 页，第 ${index + 1} 项`
      }
    })
  }

  refreshState(pageNo) {
    const params = {
      pageNo: pageNo || 1,
      pagesize: this.state.pagesize,
      id: '123456',
    }

    return this.getList(params).then((resData) => {
      const { list, total } = resData
      const newList = this.modifyList(list, pageNo)

      const oldList = (pageNo === 1 || this.state.list == null) ? [] : this.state.list

      this.setState({
        pageNo,
        total,
        list: oldList.concat(newList),
      })
    }).catch((e) => {
      console.log(e)
    })
  }


  componentDidMount() {
    // this.refreshState(1).catch((e) => {
    //   console.log(e)
    // })
  }


  render() {
    const { list, pagesize, total, pageNo } = this.state
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
          ref={(c) => {
            this.longlist = c
          }}
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




