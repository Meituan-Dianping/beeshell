import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Picker } from '../../src/'

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },

  pickerStyle: { backgroundColor: 'red', padding: 30, marginTop: 30 }
})

interface State {
  count: number
}

export default class PickerScreen extends Component<{}, State> {
  [propName: string]: any
  constructor (p) {
    super(p)
    this.state = {
      count: 0
    }
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}>

        <View style={styles.panel}>

          <View style={{ flexDirection: 'row' }}>
            <Picker
              ref={(c) => {
                this.picker1 = c
              }}
              label='甜点饮品'
              disabled={false}
              cancelable={true}
              toggle={(active) => {
                if (active) {
                  this.picker2.close().catch((e) => {
                    // console.log(e)
                  })

                  this.picker3.close().catch((e) => {
                    // console.log(e)
                  })
                }
              }}>

              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                  borderTopColor: '#ddd',
                  borderTopWidth: StyleSheet.hairlineWidth
                }}>
                <Text>内容区</Text>
              </View>
            </Picker>

            <Picker
              ref={(c) => {
                this.picker2 = c
              }}
              label='筛选'
              disabled={true}
              cancelable={true}>

              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200,
                  borderTopColor: '#ddd',
                  borderTopWidth: StyleSheet.hairlineWidth
                }}>
                <Text>内容区</Text>
              </View>
            </Picker>
          </View>

          <Picker
            ref={(c) => {
              this.picker3 = c
            }}
            label='全部业务'
            disabled={false}
            cancelable={true}
            toggle={(active) => {
              if (active) {
                this.picker1.close().catch((e) => {
                  // console.log(e)
                })

                this.picker2.close().catch((e) => {
                  // console.log(e)
                })
              }
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
                borderTopColor: '#ddd',
                borderTopWidth: StyleSheet.hairlineWidth
              }}>
              <Text>内容区</Text>
            </View>
          </Picker>
        </View>

        <Picker
          style={{ marginTop: 100 }}
          ref={(c) => {
            this.picker4 = c
          }}
          renderLabel={(active) => {
            const color = active ? 'red' : '#444'
            return (
              <Text style={{ padding: 15, fontSize: 20, textAlign: 'center', color }}>
                自定义按钮（{ active ? '打开' : '关闭'}）
              </Text>
            )
          }}
          disabled={false}
          cancelable={true}
          onPress={() => {
            console.log('press, picker4')
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
              borderTopColor: '#ddd',
              borderTopWidth: StyleSheet.hairlineWidth
            }}>
            <Text>内容区</Text>
          </View>
        </Picker>
      </View>
    )
  }
}
