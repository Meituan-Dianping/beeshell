import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import { NavigationBar } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'

export default class NavigationBarScreen extends Component<{}, {}> {

  constructor (p) {
    super(p)
    this.state = {}
  }

  handlePress (msg) {
    alert(msg)
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>
        <Text style={styles.header}>基础</Text>
        <NavigationBar
          title='标题'
          backLabel='返回'
          forwardLabel='下一步'
          onPressBack={() => {
            this.handlePress('返回')
          }}
          onPressForward={() => {
            this.handlePress('下一步')
          }}>
        </NavigationBar>
      </ScrollView>
    )
  }
}
