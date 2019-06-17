import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, SectionList, SafeAreaView, StatusBar } from '@mrn/react-native'
import styles from './common/styles'
import variables from './customTheme'
import { Icon } from '../src/'

import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  createBottomTabNavigator
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
    setTimeout(() => {
      this.props.navigation.navigate('SlideModal')
    }, 1000)
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
              {item.key} - {item.label}
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
      </View>
    )
  }
}

function makeHeader (navigation, title, backLabelText, item?) {
  return (
    <NavigationBar
      testID={item ? `navigationBar${item.key}` : undefined}
      style={{ borderBottomColor: variables.mtdBorderColorDark, borderBottomWidth: StyleSheet.hairlineWidth }}
      title={title}
      backLabelText={backLabelText}
      onPressBack={() => {
        navigation.back()
      }}
    />
  )
}

const HomeStack = createStackNavigator({
  // 首页
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: makeHeader(navigation, 'roo-mobile-rn 组件库', null)
    })
  },
  // 其余的展示页
  ...pageList.reduce((res, item) => {
    res[item.key] = {
      navigationOptions: ({ navigation }) => ({
        header: makeHeader(navigation, item.title || `${item.key} ${item.label}`, '', item)
      }),
      ...item
    }
    return res
  }, {})
}, {
  useDowngrade: false // 是否使用降级，默认true，使用 debug 功能时请关闭
})


const tabNavigatorConfigs = {
  Home: {
    screen: HomeStack,
    icon: 'home-o',
    label: '首页'
  },
  Work: {
    screen: () => { return null },
    icon: 'th-large-o',
    label: '工作台'
  },
  Personal: {
    screen: () => { return null },
    icon: 'user-o',
    label: '我的'
  },
  Config: {
    screen: () => { return null },
    icon: 'cog-o',
    label: '配置'
  }
}

let TabNavigator = createBottomTabNavigator(
  {
    ...tabNavigatorConfigs
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        return <Icon type={tabNavigatorConfigs[routeName].icon} size={18} tintColor={tintColor} />
      },

      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state

        return (
          <Text style={{ fontSize: 12, color: tintColor, marginBottom: 5, textAlign: 'center' }}>
            {tabNavigatorConfigs[routeName].label}
          </Text>
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: variables.mtdBrandPrimaryDark,
      inactiveTintColor: variables.mtdGray,
      style: {
        height: 45,
        borderTopColor: variables.mtdBorderColorDarker,
        backgroundColor: '#fff',
      },
    },
  }
)

// 在调试模式下进行热更新
if (process.env.NODE_ENV !== 'production') {
  const { hot } = require('react-hot-loader')
  TabNavigator = hot(module)(TabNavigator)
}

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SafeAreaView style={{ backgroundColor: '#fff' }} />
        <TabNavigator />
      </View>
    )
  }
}
