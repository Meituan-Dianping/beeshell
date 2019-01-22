import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Button, Dialog, Icon } from '../../src/'
import variables from '../customTheme'
import styles from '../common/styles'


interface State {
  count: number,
  animatedTranslateX: any,
  animatedTranslateY: any
}

export default class DialogScreen extends Component<{}, State> {
  [propName: string]: any

  constructor (p) {
    super(p)
    this.state = {
      count: 0,
      animatedTranslateX: undefined,
      animatedTranslateY: undefined
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
        style={styles.body}>
        <View style={styles.container}>
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            reverse
            onPress={() => {
              this.dialog1.open()
            }}
          >
            基础
          </Button>
          <Dialog
            ref={(c) => {
              this.dialog1 = c
            }}
            header='系统提示'
            body='确认删除该信息？'
            cancelable={true}
            cancelCallback={() => {
              console.log('cancel')
            }}
            confirmCallback={() => {
              console.log('confirm')
            }}
          />

          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            reverse
            onPress={() => {
              this.dialogA.open()
            }}
          >
            一个按钮
          </Button>

          <Dialog
            ref={(c) => {
              this.dialogA = c
            }}
            header='系统提示'
            body='确认删除该信息？确认删除该信息？确认删除该信息？'
            cancelable={true}
            confirmLabel='我知道了'
            confirmCallback={() => {
              console.log('confirm')
            }}
          />

          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            reverse
            onPress={() => {
              this.dialog2.open()
            }}
          >
            自定义 header body & footer
          </Button>

          <Dialog
            ref={(c) => { this.dialog2 = c }}
            header={null}
            body={
              <View style={{ backgroundColor: '#fff', padding: 20 }}>
                <View style={{ backgroundColor: '#ebebea', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>自定义内容</Text>
                </View>
              </View>}
            cancelable={true}
            operationList={[
              {
                label: '操作一',
                type: 'confirm',
                callback: () => {
                  console.log('操作一')
                }
              },
              {
                label: '操作二',
                type: 'confirm',
                callback: () => {
                  console.log('操作二')
                }
              },
              {
                label: '操作三',
                type: 'cancel',
                callback: () => {
                  console.log('操作三')
                }
              }
            ]}
            renderOperationItem={(item, index) => {
              const color = item.type === 'confirm' ? variables.mtdBrandPrimaryDark : variables.mtdGrayDark
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 15
                  }}>
                  <Icon type='star' size={16} tintColor={color} />
                  <Text style={{ fontSize: 16, color, marginLeft: 5 }} >{item.label}</Text>
                </View>
              )
            }}>
          </Dialog>

          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            reverse
            onPress={() => {
              this.dialog3.open()
            }}
          >
            自定义 footer 布局
          </Button>

          <Dialog
            ref={(c) => { this.dialog3 = c }}
            body={
              <View style={{ backgroundColor: '#fff', padding: 20 }}>
                <View style={{ backgroundColor: '#ebebea', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>自定义内容</Text>
                </View>
              </View>}
            cancelable={true}
            operationLayout='column'
            operationList={[
              {
                label: '操作一',
                type: 'cancel',
                callback: () => {
                  console.log('操作一')
                }
              },
              {
                label: '操作二',
                type: 'confirm',
                callback: () => {
                  console.log('操作二')
                }
              },
              {
                label: '操作三',
                type: 'confirm',
                callback: () => {
                  console.log('操作三')
                }
              }
            ]}>
          </Dialog>
        </View>
      </ScrollView>
    )
  }
}
