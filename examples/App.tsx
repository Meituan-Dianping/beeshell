import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from '@mrn/react-native'

import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from '@mrn/react-navigation'

import { withSafeArea } from '@mrn/react-native-safe-area-view'
import { NavigationBar } from '../src'
import { PagesList } from './routers'

interface MyProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}
interface MyState {
  PagesList: (any)[]
}

const styles = StyleSheet.create({
  textCenter: {
    width: '100%',
    textAlign: 'center'
  },
  header: {
    marginTop: 20,
    padding: 20
  },
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 4
  },
  nickname: {
    color: '#777777'
  },
  handleIcon: {
    color: '#ababab'
  },
  footer: {
    marginTop: 20,
    padding: 20,
    marginBottom: 50
  }
})

class Home extends Component<MyProps, MyState> {
  constructor (p) {
    super(p)
    this.state = { PagesList }
  }

  gotoPage (item) {
    this.props.navigation.navigate(item.key)
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.textCenter}>
            roo-mobile-rn components
          </Text>
        </View>
        {
          this.state.PagesList.map(item => (
            <TouchableOpacity style={styles.panel} onPress={() => this.gotoPage(item)} key={item.key}>
              <Text>
                {item.name}
                <Text style={styles.nickname}> {item.key}</Text>
              </Text>
              <Text style={styles.handleIcon}>></Text>
            </TouchableOpacity>
          ))
        }
        <View style={styles.footer}>
          <Text style={styles.textCenter}></Text>
        </View>
      </ScrollView>
    )
  }
}

function MakeHeader (navigation, title) {
  return <NavigationBar hasSearchBar={false} title={title} onPressBackButton={e => navigation.back()} />
}

let RootStack = createStackNavigator({
  // 首页
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: MakeHeader(navigation, 'MTD RN')
    })
  },
  // 其余的展示页
  ...PagesList.reduce((res, item) => {
    res[item.key] = {
      navigationOptions: ({ navigation }) => ({
        header: MakeHeader(navigation, item.name)
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
