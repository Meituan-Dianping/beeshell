import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, SectionList } from '@mrn/react-native'
import styles from './common/styles'
import variables from './customTheme'

import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from '@mrn/react-navigation'

// @ts-ignore
import { withSafeArea } from '@mrn/react-native-safe-area-view'
import { NavigationBar } from '../src'
import { pageList } from './routers'

class Home extends Component<any, any> {
  constructor (p) {
    super(p)
    this.state = {
      sections: [
        {
          label: '通用',
          key: 'general',
        },

        // {
        //   label: '布局',
        //   key: 'layout',
        // },

        {
          label: '导航',
          key: 'navigation',
        },
        {
          label: '数据录入',
          key: 'dataEntry',
        },

        {
          label: '数据展示',
          key: 'dataDisplay',
        },

        {
          label: '操作反馈',
          key: 'feedback'
        },

        {
          label: '其他',
          key: 'other'
        },

        {
          label: '基础工具',
          key: 'base'
        },

        {
          label: '演示',
          key: 'demo'
        }
      ]
    }

    this.state.sections.forEach((item) => {
      item.data = item.data || []
      pageList.forEach((pageItem) => {
        pageItem.group = pageItem.group || 'other'
        if (pageItem.group === item.key) {
          item.data.push(pageItem)
        }
      })
    })
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.props.navigation.navigate('NavigationBar')
    // }, 1000)
  }

  gotoPage (item) {
    this.props.navigation.navigate(item.key)
  }

  renderSectionListItem = (rowData) => {
    const { item, index, section } = rowData
    // console.log(rowData)
    const isFirst = index === 0
    const isLast = index === section.data.length - 1
    return (
      <TouchableOpacity
        testID={item.key}
        onPress={() => {
          this.gotoPage(item)
        }}>
        <View
          style={[
            {
              paddingHorizontal: variables.mtdHSpacingXL,
              paddingVertical: variables.mtdVSpacingXL,
              backgroundColor: '#fff',
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: 'transparent',
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: 'transparent',

            },
            {
              borderTopColor: isFirst ? variables.mtdGrayLightest : 'transparent',
              marginTop: isFirst ? StyleSheet.hairlineWidth : 0,
              borderBottomColor: isLast ? variables.mtdGrayLightest : 'transparent'
            }
          ]}>
          <Text
            style={{
              color: variables.mtdGrayBase,
              // fontSize: 14
            }}>
              {item.label} - {item.key}
          </Text>
        </View>
        {
            (!isLast) ?
            <View
              style={{
                marginLeft: variables.mtdHSpacingXL,
                height: StyleSheet.hairlineWidth,
                backgroundColor: variables.mtdGrayLightest
              }}>
            </View> : null
          }
      </TouchableOpacity>
    )
  }

  renderSectionHeader = (sectionData) => {
    const { section } = sectionData

    return (
        <Text
          style={[
            styles.header,
            {
              color: variables.mtdBrandPrimaryDark,
            }
          ]}>
          {section.label}
        </Text>
    )
  }

  render () {
    return (
      <View
        style={styles.body}>
        <SectionList
          sections={this.state.sections}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderSectionListItem}>
        </SectionList>
        <View style={{}}>
          <Text style={{}}></Text>
        </View>
      </View>
    )
  }
}

function MakeHeader (navigation, title, backLabel, item?) {
  return (
    <NavigationBar
      testID={item ? `navigationBar${item.key}` : undefined}
      style={{ borderBottomColor: variables.mtdBorderColorDark, borderBottomWidth: StyleSheet.hairlineWidth }}
      title={title}
      backLabel={backLabel}
      onPressBack={() => {
        navigation.back()
      }}
    />
  )
}

let RootStack = createStackNavigator({
  // 首页
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: MakeHeader(navigation, 'roo-mobile-rn', null)
    })
  },
  // 其余的展示页
  ...pageList.reduce((res, item) => {
    res[item.key] = {
      navigationOptions: ({ navigation }) => ({
        header: MakeHeader(navigation, item.label, '', item)
      }),
      ...item
    }
    return res
  }, {})
}, {
  useDowngrade: false // 是否使用降级，默认true，使用 debug 功能时请关闭
})

// 在调试模式下进行热更新
if (process.env.NODE_ENV !== 'production') {
  const { hot } = require('react-hot-loader')
  RootStack = hot(module)(RootStack)
}

export default withSafeArea()(RootStack)
