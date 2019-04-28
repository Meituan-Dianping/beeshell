import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import { Button, Tip, Icon } from '../../src/'
import variables from '../customTheme'
import styles from '../common/styles'

const positions = [
  ['top', 'left'],
  ['top'],
  ['top', 'right'],
  ['left'],
  ['center'],
  ['right'],
  ['bottom', 'left'],
  ['bottom'],
  ['bottom', 'right']
]

export default class TipScreen extends Component<{}, any> {
  [propName: string]: any

  constructor (p) {
    super(p)
    this.state = {
      positionIndex: 0
    }
  }
  componentDidMount() {
    Tip.show('API 调用方式：Tip.show', 3000, false, 'center')
    Tip.show('API 调用方式，自定义位置', 2000, true, ['left', 'bottom'])
  }
  render () {
    return (
      <ScrollView
        style={styles.body}>
        <View style={styles.container}>
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.tip1.open()
            }}
          >
            基础
          </Button>
          <Tip
            ref={(c) => {
              this.tip1 = c
            }}
            body='信息删除成功！'
            cancelable={true}
          />

          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.tipA.open()
            }}
          >
            信息太多自动换行
          </Button>

          <Tip
            ref={(c) => {
              this.tipA = c
            }}
            body='信息太多自动换行，信息太多自动换行，信息太多自动换行，信息太多自动换行'
            cancelable={true}
          />

          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.tip2.open()
            }}
          >
            自定义展示位置
          </Button>

          <Tip
            ref={(c) => { this.tip2 = c }}
            body={`位置${positions[this.state.positionIndex]}`}
            position={positions[this.state.positionIndex] as any}
            cancelable={true}
            onClosed={() => {
              this.setState({
                positionIndex: this.state.positionIndex + 1
              })
            }}
          />

          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.tip3.open()
            }}
          >
            自定义内容
          </Button>

          <Tip
            ref={(c) => { this.tip3 = c }}
            body={
              <View>
                <ActivityIndicator size='small' color='#fff' />
                <Text style={{ color: '#fff', textAlign: 'center', marginTop: 10 }}>加载中...</Text>
              </View>
            }
            cancelable={true}>
          </Tip>
        </View>
      </ScrollView>
    )
  }
}
