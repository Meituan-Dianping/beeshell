import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import { Button, Tip, Icon } from '../../src/'
import variables from '../customTheme'
import styles from '../common/styles'

export default class TipScreen extends Component<{}, any> {
  [propName: string]: any

  constructor (p) {
    super(p)
    this.state = {
      count: 0,
      animatedTranslateX: undefined,
      animatedTranslateY: undefined
    }
  }
  componentDidMount() {
    Tip.show('API 调用方式：Tip.show', 3000, true, 'center')
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
              setTimeout(() => {
                this.setState({
                  containerPosition: this.state.containerPosition === 'top' ? 'bottom' : 'top'
                })
                this.tip2.open()
              })
            }}
          >
            自定义展示位置
          </Button>

          <Tip
            ref={(c) => { this.tip2 = c }}
            body={`位置${this.state.containerPosition}`}
            contentContainerPosition={this.state.containerPosition}
            cancelable={true}>
          </Tip>

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
              </View>}
            cancelable={true}>
          </Tip>
        </View>
      </ScrollView>
    )
  }
}
