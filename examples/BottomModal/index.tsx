import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'

import { Button, SlideModal, BottomModal, Icon } from '../../src/'
import styles from '../common/styles'

const screen = Dimensions.get('window')

export default class BottomModalScreen extends Component<{}, any> {
  [propName: string]: any

  constructor (p) {
    super(p)
    this.state = {
      count: 0
    }
  }
  clickHandle (e) {
    this.setState({
      count: this.state.count + 1
    })
    console.warn('clickHandle', Object.keys(e))
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
            this.bottomModal1.open()
          }}
        >
          BottomModal 基础
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModal1 = c }}
          title='选择品类'
          cancelable={true}
          leftCallback={() => {
            console.log('cancel')
          }}
          rightCallback={() => {
            console.log('confirm')
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              height: 300,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text>自定义内容</Text>
          </View>
        </BottomModal>

        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.bottomModal2.open()
          }}
        >
          BottomModal 自定义标题与按钮
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModal2 = c }}
          title={
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12 }}>
              <Text style={{ fontSize: 16, marginRight: 5 }}>自定义标题</Text>
              <Icon type='question-circle' size={16}></Icon>
            </View>
          }
          cancelable={true}
          leftLabel={null}
          rightLabel={
            <Text style={{ flex: 1, textAlign: 'right', marginRight: 15, marginTop: -2, fontSize: 30, color: '#aaa' }}>&times;</Text>
          }
          rightCallback={() => {
            console.log('confirm')
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              height: 300,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text>自定义内容</Text>
          </View>
        </BottomModal>

        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.slideModal.open()
          }}
        >
          SlideModal 任意自定义
        </Button>

        <SlideModal
          ref={(c) => { this.slideModal = c }}
          cancelable={true}
        >
          <View
            style={{
              width: screen.width,
              backgroundColor: '#fff',
              paddingHorizontal: 15
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10
              }}
            >
              <Text style={{ fontSize: 18 }}>我是标题</Text>
              <TouchableOpacity
                onPress={() => {
                  this.slideModal.close()
                }}>
                <Text style={{ textAlign: 'right', marginTop: -2, fontSize: 30, color: '#aaa' }}>
                  &times;
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                alignItems: 'center',
                justifyContent: 'center',
                height: 300
              }}>
              <Text>自定义内容</Text>
            </View>
            <Button style={{ marginVertical: 10 }} type='primary' reverse>我是按钮</Button>
          </View>

          <View
            style={{ maxHeight: 30 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ height: 60 }}></View>
            </SafeAreaView>
          </View>
        </SlideModal>
      </ScrollView>
    )
  }
}
