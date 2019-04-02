import React, { Component } from 'react'
import createReactClass from 'create-react-class'
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const screen = Dimensions.get('window')

let topview = null

const topviewStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})

class Topview extends Component<any, {count: number, modelList: Array<any>}> {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      modelList: []
    }
    topview = this
  }

  add (c, args) {
    return new Promise(resolve => {
      setTimeout(() => {
        let { modelList, count } = this.state
        ++count
        const tmp = modelList.concat()
        tmp.push({
          id: count,
          component: c,
          args
        })
        this.setState({
          count,
          modelList: tmp
        })
        return resolve(count)
      })
    }).catch(e => {
      console.error(e)
    })
  }

  remove (id) {
    let { modelList, count } = this.state
    let index

    return new Promise(resolve => {
      modelList.some((item, i) => {
        /* tslint:disable:triple-equals */
        if (item.id == id) {
          index = i
          return true
        }
      })
      if (index == null) {
        return resolve()
      }

      const tmp = modelList.concat()
      tmp.splice(index, 1)

      if (!tmp.length) {
        count = 0
      }

      this.setState(
        {
          modelList: tmp,
          count
        },
        () => {
          return resolve()
        }
      )
    }).catch(e => {
      console.error(e)
    })
  }

  replace (c, id) {
    return new Promise(resolve => {
      let { modelList } = this.state

      const tmpList = modelList.concat()
      let tmpIndex
      let tmpItem = tmpList.filter((item, index) => {
        if (item.id === id) {
          tmpIndex = index
          return true
        }
      })[0]

      tmpItem = {
        ...tmpItem,
        component: c
      }

      tmpList.splice(tmpIndex, 1, tmpItem)

      this.setState(
        {
          modelList: tmpList
        },
        () => {
          return resolve()
        }
      )
    }).catch(e => {
      console.error(e)
    })
  }

  render () {
    const { modelList } = this.state
    if (!modelList.length) {
      return null
    } else {
      return (
        <View
          pointerEvents='box-none'
          collapsable={false}
          style={topviewStyles.container}>

          {
            modelList.map((item) => {
              const args = item.args || {}
              args.fullScreenPatch = args.fullScreenPatch || []

              return item.component ? (
                  <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: args.screenWidth == null ? screen.width : args.screenWidth,
                        height: args.screenHeight == null ? screen.height : args.screenHeight
                      }}
                      key={item.id}
                      collapsable={false}
                      pointerEvents={'box-none'}>

                      {
                        args.fullScreenPatch.map((patchItem, patchIndex) => {
                          return (
                            <TouchableOpacity
                              key={patchIndex}
                              activeOpacity={patchItem.rect.opacity}
                              style={{
                                position: 'absolute',
                                ...patchItem.rect
                              }}
                              onPress={() => {
                                if (patchItem.cancelable) {
                                  patchItem.closeFn()
                                }
                              }}>
                            </TouchableOpacity>
                          )
                        })
                      }

                      { item.component }
                  </View>
              ) : null
            })
        }
        </View>
      )
    }
  }
}

// 制作registerComponent 的替身
const originRegisterComponent = AppRegistry.registerComponent

// 改写 registerComponent 方法的实现
AppRegistry.registerComponent = function (element, func) {
  const reg = func()
  return originRegisterComponent(element, function () {
    return createReactClass({
      render: function () {
        // 创建 root_element
        return React.createElement(
          View,
          {
            style: { flex: 1 }
          },
          React.createElement(reg, this.props),
          React.createElement(Topview, null)
        )
      }
    })
  })
}

function getInstance () {
  return topview
}

export {
  getInstance as TopviewGetInstance,
  Topview
}
