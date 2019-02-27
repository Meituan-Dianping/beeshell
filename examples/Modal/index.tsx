import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Button, Modal } from '../../src/'
import styles from '../common/styles'


export default class ModalScreen extends Component<{}, any> {
  [prpsName: string]: any

  constructor (p) {
    super(p)
    this.state = {
      animatedTranslateX: undefined,
      animatedTranslateY: undefined
    }
  }

  render () {
    return (
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.container}>

        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.modal1.open()
          }}>
          基础
        </Button>
        <Modal
          ref={c => {
            this.modal1 = c
          }}
          cancelable={true}>

          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容</Text>
          </View>
        </Modal>
        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.modal3.open()
          }}>
          横向拉伸，水平外边距 40
        </Button>
        <Modal
          ref={c => {
            this.modal3 = c
          }}
          cancelable={true}
          contentContainerStyle={{
            flex: 1,
            marginHorizontal: 40,
          }}>
          <View style={{ height: 100, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text>自定义内容</Text>
          </View>
        </Modal>

        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            setTimeout(() => {
              this.setState({
                containerPositon: this.state.containerPositon === 'top' ? 'bottom' : 'top'
              })
              this.modal4.open()
            })
          }}>
          自定义展示位置
        </Button>
        <Modal
          ref={c => {
            this.modal4 = c
          }}
          cancelable={true}
          contentContainerPositon={this.state.containerPositon}
          contentContainerStyle={{
            marginTop: this.state.containerPositon === 'top' ? 90 : null,
            marginBottom: this.state.containerPositon === 'bottom' ? 90 : null,
          }}>
          <View style={{ width: 200, height: 100, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text>位置：{this.state.containerPositon}</Text>
          </View>
        </Modal>

        <Button
          ref={(element) => {
            this.btnEl = element
          }}
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.btnEl.measure((fx, fy, width, height, px, py) => {
              this.setState({
                animatedTranslateX: px + width / 2,
                animatedTranslateY: py + height / 2
              }, () => {
                this.modal2.open()
              })
            })
          }}
        >
          自定义弹出位置
        </Button>

        <Modal
          ref={(c) => { this.modal2 = c }}
          animatedTranslateX={this.state.animatedTranslateX || undefined}
          animatedTranslateY={this.state.animatedTranslateY || undefined}
          cancelable={true}>

          <View style={{ width: 200, height: 100, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text>自定义内容</Text>
          </View>
        </Modal>


        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.modalA.open()
          }}>
          自定义 offset
        </Button>
        <Modal
          offsetY={100}
          offsetX={50}
          ref={c => {
            this.modalA = c
          }}
          cancelable={true}>

          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}>
            <Text>自定义内容</Text>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}
