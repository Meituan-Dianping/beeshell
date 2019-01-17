import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'

import { Button, Actionsheet, Icon } from '../../src/'
import varibles from '../../src/common/styles/variables'
import styles from '../common/styles'

const screen = Dimensions.get('window')

const componentStyles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 2
  },
  cell: {
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#dddddd',
    borderBottomWidth: 1
  }
})

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
        style={styles.container}>
        <View style={styles.panel}>
          <Button
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
              { label: '选项 1', value: '1' },
              '选项 2',
              { label: '选项 3', value: '3' },
              { label: '选项 4', value: '4' },
              { label: '选项 5', value: '5' },
              { label: '选项 6', value: '6' },
              7
            ]}
            cancelable={true}
            confirmCallback={item => {
              console.log(item)
            }}
            cancelCallback={() => {
              console.log('cancel')
            }}
          />
        </View>

        <View style={componentStyles.card}>
          {/* 基础 */}
          <View style={componentStyles.cell}>
          </View>

          {/* 自定义头部 */}
          <View style={componentStyles.cell}>
            <Button
              onPress={() => {
                this.actionsheet2.open()
              }}
            >
              自定义头部、选项以及 footer
            </Button>

            <Actionsheet
              ref={(c) => {
                this.actionsheet2 = c
              }}
              heading={
                <View
                  style={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: varibles.mtdBorderColorBase,
                    backgroundColor: '#fff',
                    paddingVertical: 15
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      color: 'red'
                    }}>
                    自定义头部
                  </Text>
                </View>
              }
              options={[
                {
                  text: '选项1',
                  value: '1'
                },
                {
                  text: '选项2',
                  value: '2'
                },
                {
                  text: '选项3',
                  value: '3'
                }
              ]}
              cancelable={true}
              renderItem={(item) => {
                return (
                  <View style={{ flexDirection: 'row', paddingVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type='star-o' tintColor='red' />
                    <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: 'bold' }}>{item.text}</Text>
                  </View>
                )
              }}
              footer={
                <TouchableOpacity>
                  <View
                    style={{
                      marginTop: 3,
                      backgroundColor: '#fff',
                      paddingVertical: 15
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 16,
                        color: 'red'
                      }}>
                      自定义底部
                    </Text>
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
        </View>
      </ScrollView>
    )
  }
}
