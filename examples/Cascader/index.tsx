/**
 * mengqian02 20170615
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView
} from 'react-native'

import { Cascader, BottomModal, Button, Icon } from '../../src/'
import { optionA, assignedOptionA , optionB, assignedOptionB } from './demoData.js'

import styles from '../common/styles'
import variables from '../customTheme'


export default class CascaderScreen extends Component<any, any> {
  bottomModalA = null
  bottomModalB = null
  bottomModalC = null
  constructor (props) {
    super(props)
    this.state = {
      showPickerA: false,
      confirmInfo: [],
      changeInfo: []
    }
  }

  handleConfirm (selectedChain) {
    const confirmInfo = selectedChain.map(item => item.label).join('/')
    this.setState({
      confirmInfo
    })
    console.log('handleConfirm', confirmInfo, selectedChain)
  }

  handleChange (selectedChain) {
    const changeInfo = selectedChain.map(item => item.label).join('/')
    console.log('handleChange', changeInfo, selectedChain)
    this.setState({
      changeInfo
    })
  }

  showPickerA () {
    this.setState({
      showPickerA: true
    })
  }

  showPickerB () {
    this.setState({
      showPickerB: true
    })
  }

  // 随机两位字符
  randomStr (length) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  /**
   * 异步请求 返回结果必须是个promise 对象
   * @param {*} option 一个选中的项目
   */
  syncLoadData (option) {
    console.log(option)
    const result = []
    return new Promise((resolve, reject) => {
      // 这里做多返回4级菜单
      if (option.level < 100 && option.label !== '全部') {
        const nextLevel = option.level + 1
        for (let index = 1; index < 7; index++) {
          result.push({
            name: `L${nextLevel}_${index}`,
            value: 10 * nextLevel + index
          })
        }
        setTimeout(() => {
          resolve(result)
        }, 200)
      } else {
        setTimeout(() => {
          reject()
        }, 200)
      }
    })
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
            this.bottomModalA.open()
          }}>
          基础（同步数据）
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModalA = c }}
          title='正常数据一次性请求'
          cancelable={true}
          leftCallback={() => {
            console.log('cancel')
          }}
          rightCallback={() => {
            console.log('confirm')
          }}>
          <Cascader
            style={{ flex: 1, height: 200 }}
            options={optionA}
            assignedOption={assignedOptionA}
            onConfirm={this.handleConfirm.bind(this)}
            onChange={this.handleChange.bind(this)}
          />
        </BottomModal>


        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.bottomModalC.open()
          }}
        >
          自定义选项（异步数据）
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModalC = c }}
          title='动态数据'
          cancelable={true}
          leftCallback={() => {
            console.log('cancel')
          }}
          rightCallback={() => {
            console.log('confirm')
          }}
        >
          <Cascader
            style={{ flex: 1 }}
            onConfirm={this.handleConfirm.bind(this)}
            onChange={this.handleChange.bind(this)}
            itemSelectedStyle={{ color: variables.mtdBrandPrimary }}
            flexCols={[2, 1, 1]}
            structKeys={['name', 'value', 'child']}
            onSyncData={this.syncLoadData.bind(this)}
            renderItem={(item) => {
              const selected = item.selected
              const color = selected ? 'red' : '#333'
              const backgroundColor = selected ? '#f5f5f5' : '#fff'
              const icon = selected ? <Icon style={{ marginRight: 5 }} type='star' size={14} tintColor={color} /> : null
              return (
                <View style={{ padding: 15, backgroundColor, flexDirection: 'row', alignItems: 'center' }}>
                  {icon}<Text style={{ color }}>{item.label}</Text>
                </View>
              )
            }}
            assignedOption={[11,22,33]}
          />

          <View style={{ maxHeight: 30 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ height: 60 }}></View>
            </SafeAreaView>
          </View>
        </BottomModal>

       {/* <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.bottomModalB.open()
          }}
        >
          自定义structKeys ['label','value','child'], 样式自定义
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModalB = c }}
          title='自定义structKeys'
          cancelable={true}
          leftCallback={() => {
            console.log('cancel')
          }}
          rightCallback={() => {
            console.log('confirm')
          }}
        >
          <Cascader
            style={{ flex: 1, height: 200 }}
            options={optionB}
            assignedOption={assignedOptionB}
            onConfirm={this.handleConfirm.bind(this)}
            onChange={this.handleChange.bind(this)}
            structKeys={['label','value','child']}
            itemStyle={{ color: 'coral' }}
            itemSelectedStyle={{ backgroundColor: 'lemonchiffon', color: 'blue' }}
            autoAddEntire
          />
        </BottomModal>*/}

      </ScrollView>
    )
  }
}
