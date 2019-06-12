import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import { NavigationBar, Icon } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'

export default class NavigationBarScreen extends Component<{}, any> {

  constructor (p) {
    super(p)
    this.state = {}
  }

  handlePress (msg) {
    this.setState({
      msg
    })
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>
        <Text style={styles.header}>基础</Text>
        <NavigationBar
          testID='nav1'
          title='标题'
          backLabelText='返回'
          forwardLabelText='下一步'
          onPressBack={() => {
            this.handlePress('返回')
          }}
          onPressForward={() => {
            this.handlePress('下一步')
          }}>
        </NavigationBar>
        {
          this.state.msg ? <Text testID='text' style={{ margin: 5, textAlign: 'center' }}>
            点击了“{this.state.msg}”按钮
          </Text> : null
        }

        <Text style={styles.header}>自定义文字样式</Text>
        <NavigationBar
          title='标题'
          titleStyle={{ color: variables.mtdBrandInfo }}
          backLabelText='返回'
          backLabelTextStyle={{ color: variables.mtdBrandDanger }}
          forwardLabelText='下一步'
          forwardLabelTextStyle={{ color: variables.mtdBrandSuccess }}>
        </NavigationBar>

        <Text style={styles.header}>自定义返回图标</Text>
        <NavigationBar
          title='标题'
          backLabelText='关闭'
          backLabelIcon={<Icon type='times' tintColor='red' />}
          forwardLabel={<View></View>}>
        </NavigationBar>
      </ScrollView>
    )
  }
}
