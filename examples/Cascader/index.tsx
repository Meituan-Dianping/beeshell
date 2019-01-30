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
import { optionsA, optionsD } from './demoData.js'

export default class CascaderScreen extends Component<any, any> {
  private bottomModalA = null
  private bottomModalB = null
  private bottomModalC = null

  constructor (props) {
    super(props)
    this.state = {
      valueA: [ 'sweet', 'sweetie' ],

      optionsB: []
      valueB: [],
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     valueA: [ 'sweet', 'icecream' ]
    //   })
    // }, 3000)

    this.fetchData().then((data) => {
      this.setState({
        optionsB: data.list
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  handleChange () {

  }

  handleChangeB = (value) => {
    // console.log('value', value)
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
      this.fetchData(value).then((data) => {
        let newOptionsB
        if (data && data.list && data.list.length) {
          targetItem.children = data.list

          newOptionsB = [
            ...this.state.optionsB
          ]
        } else {
          newOptionsB = this.state.optionsB
        }
        // console.log('newOptionsB', newOptionsB)
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

  fetchData(value) {
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

  modOptions(options, labelKey, valueKey, childrenKey) {
    if (options && options.length) {
      options.forEach((item) => {
        item[labelKey] = `${item[labelKey]}(${item[valueKey]})`
        if (item[childrenKey] && item[childrenKey].length) {
          this.modOptions(item[childrenKey], labelKey, valueKey, childrenKey)
        }
      })
    }
  }


  render () {
    // const modOptionsA = JSON.parse(JSON.stringify(optionsA))
    // this.modOptions(modOptionsA, 'label', 'value', 'children')

    return (
      <View
        style={[styles.body, styles.container]}>

        <Button
          style={{ marginTop: 12 }}
          size='sm'
          onPress={() => {
            this.bottomModalA.open()
          }}>
          基础
        </Button>


        <BottomModal
          ref={(c) => { this.bottomModalA = c }}
          title='基础'
          cancelable={true}
          leftCallback={() => {
            console.log('cancel')
          }}
          rightCallback={() => {
            console.log('confirm')
          }}>
          <Text style={{ padding: variables.mtdHSpacingXL }}>选中值：{String(this.state.valueA)}</Text>
          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            options={optionsA}
            value={this.state.valueA}
            onChange={(value) => {
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
          cancelable={true}
          leftCallback={() => {
            console.log('cancel')
          }}
          rightCallback={() => {
            console.log('confirm')
          }}>

          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            proportion={[1]}
            options={this.state.optionsB}
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
          cancelable={true}
          leftCallback={() => {
            console.log('cancel')
          }}
          rightCallback={() => {
            console.log('confirm')
          }}>

          <Cascader
            style={{ height: 200, marginBottom: 50 }}
            options={optionsA}
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
                  { hasChildren ? <Icon type='caret-right' size={14} tintColor={color}></Icon> : null }
                </View>
              )
            }}
          />
        </BottomModal>
      </View>
    )
  }
}
