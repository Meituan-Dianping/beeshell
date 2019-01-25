import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'

import { Button, Actionsheet, Icon } from '../../src/'
import variables from '../customTheme'
import styles from '../common/styles'

const screen = Dimensions.get('window')

export default class ActionsheetScreen extends Component<{}, any> {
  private actionsheet = null;
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
        style={styles.body}>
        <View style={styles.container}>
          <Button
            style={{ marginTop: 12 }}
            size='sm'
            type='primary'
            reverse
            onPress={() => {
              this.actionsheet.open()
            }}>
            基础
          </Button>

          <Actionsheet
            ref={(c) => {
              this.actionsheet = c
            }}
            title={'标题'}
            options={[
              { label: '选项一', value: '1' },
              '选项二',
              { label: '选项三', value: '3' },
              { label: '选项四', value: '4' },
              { label: '选项五', value: '5' },
              { label: '选项六', value: '6' },
            ]}
            cancelable={true}
            confirmCallback={item => {
              console.log(item)
            }}
            cancelCallback={() => {
              console.log('cancel')
            }}
          />



          <Button
            style={{ marginTop: 12 }}
            size='sm'
            onPress={() => {
              this.actionsheet2.open()
            }}>
            自定义头部、选项、footer
          </Button>

          <Actionsheet
            ref={(c) => {
              this.actionsheet2 = c
            }}
            header={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: variables.mtdBorderColor,
                  backgroundColor: '#fff',
                  paddingVertical: 12
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    marginRight: 5,
                    color: variables.mtdGray
                  }}>
                  自定义头部
                </Text>
                <Icon type='question-circle'></Icon>
              </View>
            }
            options={[
              {
                text: '自定义选项一',
                value: '1'
              },
              {
                text: '自定义选项二',
                value: '2'
              },
              {
                text: '自定义选项三',
                value: '3'
              }
            ]}
            cancelable={true}
            renderItem={(item, index) => {
              return (
                <View style={{ flexDirection: 'row', paddingVertical: 13, alignItems: 'center', justifyContent: 'center', borderBottomColor: variables.mtdBorderColorDark, borderBottomWidth: StyleSheet.hairlineWidth, backgroundColor: '#fff' }}>
                  <Icon type='star-o' tintColor='#111' size={16} />
                  <Text style={{ marginLeft: 5, fontSize: 16 }}>{item.text}</Text>
                </View>
              )
            }}
            footer={
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    paddingVertical: 12
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: variables.mtdGray,
                      marginRight: 5
                    }}>
                    自定义底部
                  </Text>
                  <Icon type='times' size={14}></Icon>
                </View>
              </TouchableOpacity>
            }
            confirmCallback={item => {
              console.log(item)
            }}
            cancelCallback={() => {
              console.log('cancel')
            }}
          />
        </View>
      </ScrollView>
    )
  }
}
