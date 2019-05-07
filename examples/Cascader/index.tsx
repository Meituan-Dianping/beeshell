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
import styles from '../common/styles'
import variables from '../customTheme'
import { optionsA, optionsX } from './demoData.js'

export default class CascaderScreen extends Component<any, any> {
  [propsName: string]: any

  constructor (props) {
    super(props)
    this.state = {
      valueA: ['sweetie'],
      valueX: ['baiziwan'],
      optionsB: [],
      valueB: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        valueX: [ 'haidianqu' ]
      })
    }, 3000)

    this.fetchData().then((data: any) => {
      this.setState({
        optionsB: data.list
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  handleChangeB = (value) => {
    const targetItem = this.getTargetItem(this.state.optionsB, value[value.length - 1])
    if (!targetItem) {
      console.log('error')
      return
    }
    if (targetItem.children && targetItem.children.length) {
      this.setState({
        valueB: value
      })
    } else {
      this.fetchData(value).then((data: any) => {
        let newOptionsB
        if (data && data.list && data.list.length) {
          targetItem.children = data.list

          newOptionsB = [
            ...this.state.optionsB
          ]
        } else {
          newOptionsB = this.state.optionsB
        }

        this.setState({
          valueB: value,
          optionsB: newOptionsB
        })
      }).catch((e) => {
        console.log(e)
      })
    }
  }

  getTargetItem(options, targetValue) {
    let targetItem = null
    if (!options || !options.length) {
      return targetItem
    }
    const matched = options.some((item) => {
      if (item.value === targetValue) {
        targetItem = item
      } else {
        targetItem = this.getTargetItem(item.children, targetValue)
      }

      if (targetItem) {
        return true
      }
    })
    return targetItem
  }

  fetchData(value?) {
    value = value || []
    const length = value.length
    let parentValue
    if (length) {
      parentValue = value[length - 1]
    } else {
      parentValue = 0
    }

    return new Promise((resolve) => {
      const list = []
      let base = parentValue * 10

      let i
      for (i = 1; i < 8; i++) {
        const value = base + i
        const label = `L${length + 1}-${i}(${value})`

        list.push({
          label,
          value
        })
      }

      setTimeout(() => {
        if (value.length >= 4) {
          resolve({})
        } else {
          resolve({
            list
          })
        }
      })
    })
  }

  render () {
    return (
      <View
        style={[styles.body, styles.container]}>

        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.bottomModalX.open()
          }}>
          扁平数据结构
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModalX = c }}
          title='扁平数据结构'
          cancelable={true}>
          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            data={optionsX}
            dataStructureType='flattened'
            value={this.state.valueX}
            onChange={(value, info) => {
              console.log(value, info)
              this.setState({
                valueX: value
              })
            }}
          />
        </BottomModal>

        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.bottomModalA.open()
          }}>
          嵌套数据结构
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModalA = c }}
          title='嵌套数据结构'
          cancelable={true}>
          <Text style={{ padding: variables.mtdHSpacingXL }}>选中值：{String(this.state.valueA)}</Text>
          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            data={optionsA}
            fieldKeys={{ idKey: 'value' }}
            value={this.state.valueA}
            onChange={(value) => {
              console.log(value)
              this.setState({
                valueA: value
              })
            }}
          />
        </BottomModal>

        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.bottomModalC.open()
          }}
        >
          异步数据
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModalC = c }}
          title='异步数据'
          cancelable={true}>
          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            proportion={[1]}
            fieldKeys={{ idKey: 'value' }}
            data={this.state.optionsB}
            value={this.state.valueB}
            onChange={this.handleChangeB}
          />
        </BottomModal>


        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.bottomModalB.open()
          }}
        >
          自定义渲染项
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModalB = c }}
          title='自定义渲染项'
          cancelable={true}>

          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            data={optionsA}
            fieldKeys={{ idKey: 'value' }}
            value={this.state.valueA}
            onChange={(value) => {
              this.setState({
                valueA: value
              })
            }}
            renderItem={(item) => {
              const active = item.active
              const hasChildren = item.children && item.children.length
              const color = active ? variables.mtdBrandDanger : variables.mtdGrayBase
              const backgroundColor = active ? variables.mtdFillBody : '#fff'
              const icon = active ? <Icon style={{ marginRight: 5 }} type='star' size={14} tintColor={color} /> : <Icon style={{ marginRight: 5 }} type='star-o' size={14} tintColor={color} />
              return (
                <View style={{ padding: 15, backgroundColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }} >
                    {icon}<Text style={{ color }}>{item.label}</Text>
                  </View>
                  { hasChildren ? <Icon type='angle-right' size={14} tintColor={color}></Icon> : null }
                </View>
              )
            }}
          />
        </BottomModal>
      </View>
    )
  }
}
