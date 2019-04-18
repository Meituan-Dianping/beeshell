import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'

import { Ruler, Button } from '../../src/'
import variables from '../customTheme'
import styles from '../common/styles'

const screen = Dimensions.get('window')

const screenWidth = Number(screen.width).toFixed(2)
const screenHeight = Number(screen.height).toFixed(2)
const StatusBarCurrentHeight = StatusBar.currentHeight == null ? '不存在' : Number(StatusBar.currentHeight).toFixed(2)

export default class RulerScreen extends Component<any, any> {
  constructor (p) {
    super(p)

    this.state = {
      showVertical: true
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <View style={styles.body}>
        <Ruler direction='vertical' />
        <Ruler direction='horizontal' />

        <View style={{ marginLeft: 80 }}>
          <Text>{`RN screenWidth and screenHeight: ${screenWidth}, ${screenHeight}`}</Text>
          <Text>{`RN StatusBar currentHeight: ${StatusBarCurrentHeight}`}</Text>
        </View>
      </View>
    )
  }
}
