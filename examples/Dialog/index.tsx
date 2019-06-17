import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

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

  getLabel(label, type, index) {
    const color = type === 'confirm' ? variables.mtdBrandPrimaryDark : variables.mtdGrayDark
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
        { index === 1 ? <Icon type='search' size={16} tintColor={color} /> : <Icon type='star' size={16} tintColor={color} />}
        <Text style={{ fontSize: 16, color, marginLeft: 5 }} >{label}</Text>
      </View>
    )
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
              this.dialog1.open()
            }}
          >
            基础
          </Button>
          <Dialog
            ref={(c) => {
              this.dialog1 = c
            }}
            title='系统提示'
            bodyText='确认删除该信息？'
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
            textColorInverse
            onPress={() => {
              this.dialogX1.open()
            }}
          >
            自定义标题样式
          </Button>
          <Dialog
            ref={(c) => {
              this.dialogX1 = c
            }}
            title='系统提示'
            titleStyle={{ color: variables.mtdBrandDanger }}
            bodyText='确认删除该信息？'
            cancelable={true}
          />

          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
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
            title='系统提示'
            bodyText='确认删除该信息？确认删除该信息？确认删除该信息？'
            cancelable={true}
            cancelLabelText={null}
            confirmLabelText='我知道了'
            confirmCallback={() => {
              console.log('confirm')
            }}
          />

          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
            onPress={() => {
              this.dialog2.open()
            }}
          >
            自定义 header body & footer
          </Button>

          <Dialog
            ref={(c) => { this.dialog2 = c }}
            header={
              <View style={{ paddingTop: 30, paddingBottom: 10, alignItems: 'center' }}>
                <Icon type='check-circle' size={50} tintColor={variables.mtdBrandSuccess} />
              </View>
            }
            body={
              <View style={{ backgroundColor: '#fff', padding: 20 }}>
                <View style={{ backgroundColor: '#ebebea', height: 80 }}>
                  <ScrollView
                    style={{ flex: 1 }}>
                    <TouchableOpacity activeOpacity={1}>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>文字多了，纵向滚动</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            }
            cancelable={true}
            operations={[
              {
                label: this.getLabel('操作一', 'confirm', 1),
                onPress: () => {
                  console.log('操作一')
                }
              },
              {
                label: this.getLabel('操作二', 'confirm', 2),
                type: 'confirm',
                onPress: () => {
                  console.log('操作二')
                }
              },
              {
                label: this.getLabel('操作三', 'cancel', 3),
                type: 'cancel',
                onPress: () => {
                  console.log('操作三')
                }
              }
            ]}>
          </Dialog>

          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            textColorInverse
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
            operationsLayout='column'
            operations={[
              {
                labelText: '操作一',
                type: 'cancel',
                onPress: () => {
                  console.log('操作一')
                }
              },
              {
                labelText: '操作二',
                type: 'confirm',
                onPress: () => {
                  console.log('操作二')
                }
              },
              {
                labelText: '操作三',
                type: 'confirm',
                onPress: () => {
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
