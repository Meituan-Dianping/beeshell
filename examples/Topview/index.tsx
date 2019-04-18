import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { TopviewGetInstance, Button } from '../../src'

import variables from '../customTheme'
import styles from '../common/styles'

export default class TopviewScreen extends Component<any, any> {
  constructor (p) {
    super(p)

    this.state = {
      fullScreenViewId: null,
      footerId: null
    }
  }

  componentDidMount () {
    // TopviewGetInstance().add()
  }

  renderFullScreenView () {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: variables.mtdFillBackdrop,
          alignItems: 'center'
        }}>

        <Button
          style={{ marginTop: 400, width: 200 }}
          size='sm'
          type='primary'
          textColorInverse
          onPress={() => {
            console.log(this.state.fullScreenViewId)
            TopviewGetInstance().remove(this.state.fullScreenViewId)
          }}>
          关闭
        </Button>
      </View>
    )
  }

  renderFooter () {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0
        }}>
        <Button
          style={{ }}
          size='sm'
          type='primary'
          textColorInverse
          onPress={() => {
            TopviewGetInstance().remove(this.state.footerId).then(() => {
              this.setState({
                footerId: null
              })
            })
          }}>
          固定在底部的按钮
        </Button>
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <Button
            style={{ marginTop: 12 }}
            size='sm'
            type='primary'
            textColorInverse
            onPress={() => {
              TopviewGetInstance().add(this.renderFullScreenView()).then((id) => {
                this.setState({
                  fullScreenViewId: id
                })
              })
            }}>
            展示全屏遮罩
          </Button>

          <Button
            style={{ marginTop: 12 }}
            size='sm'
            type='primary'
            textColorInverse
            onPress={() => {
              if (this.state.footerId) {
                return
              }
              TopviewGetInstance().add(this.renderFooter()).then((id) => {
                this.setState({
                  footerId: id
                })
              })
            }}>
            展示底部固定按钮
          </Button>
        </View>
      </ScrollView>
    )
  }
}
