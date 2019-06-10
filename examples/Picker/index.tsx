import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Picker, Icon } from '../../src/'
import variables from '../customTheme'

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

  componentDidMount () {
    setTimeout(() => {
      this.picker1 && this.picker1.open().then(() => {
        console.log('opened')
      })
    })
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
              onToggle={(active) => {
                console.log(active)
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
            label={(active) => {
              const color = active ? variables.mtdBrandDanger : variables.mtdGrayBase
              const size = 16
              return (
                <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                  <Text style={{ fontSize: size, textAlign: 'center', color, marginRight: 3 }}>
                    自定义
                  </Text>
                  {
                    active ? <Icon type='times' size={size - 3} tintColor={color}></Icon> : <Icon type='question-circle' size={size - 3} tintColor={color}></Icon>
                  }
                </View>
              )
            }}
            disabled={false}
            cancelable={true}
            onToggle={(active) => {
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
      </View>
    )
  }
}
