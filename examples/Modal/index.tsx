import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Button, Modal } from '../../src/'
import styles from '../common/styles'

const contentContainerPositions = [
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

export default class ModalScreen extends Component<{}, any> {
  [prpsName: string]: any

  constructor (p) {
    super(p)
    this.state = {
      contentContainerPositionIndex: 0,
      animatedTranslateX: undefined,
      animatedTranslateY: undefined,
      foo: 0
    }
  }

  componentDidMount () {
    // setInterval(() => {
    //   this.setState({
    //     foo: this.state.foo + 1
    //   })
    // }, 1000)
  }

  render () {
    const contentContainerPosition = contentContainerPositions[this.state.contentContainerPositionIndex]

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
            <Text>自定义内容{this.state.foo || ''}</Text>
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
          ref={(c) => {
            this.btnEl = c
          }}
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.btnEl.measure((fx, fy, width, height, px, py) => {
              this.setState({
                animatedTranslateX: px + width / 2,
                animatedTranslateY: py + height / 2
              }, () => {
                this.modal4.open()
              })
            })
          }}>
          自定义展示位置与弹出位置
        </Button>
        <Modal
          ref={c => {
            this.modal4 = c
          }}
          animatedTranslateX={this.state.animatedTranslateX || undefined}
          animatedTranslateY={this.state.animatedTranslateY || undefined}
          cancelable={true}
          contentContainerPosition={contentContainerPosition as any}
          contentContainerStyle={{
            marginTop: contentContainerPosition.indexOf('top') !== -1 ? 90 : null,
            marginBottom: contentContainerPosition.indexOf('bottom') !== -1 ? 90 : null,
            marginLeft: contentContainerPosition.indexOf('left') !== -1 ? 20 : null,
            marginRight: contentContainerPosition.indexOf('right') !== -1 ? 20 : null
          }}
          onClosed={() => {
            this.setState({
              contentContainerPositionIndex: (this.state.contentContainerPositionIndex + 1) % contentContainerPositions.length
            })
          }}>
          <View style={{ width: 200, height: 100, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text>位置：{contentContainerPosition.join(',')}</Text>
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
          offsetY={300}
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
