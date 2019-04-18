import React, { Component, ReactElement } from 'react'
import createReactClass from 'create-react-class'
import {
  AppRegistry,
  View
} from 'react-native'

let topview = null

class Topview extends Component<any, {count: number, modelList: Array<any>}> {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      modelList: []
    }
    topview = this
  }

  add (c: ReactElement<any>, args?: any) {
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

  remove (id: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        let { modelList, count } = this.state
        let index = null
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

        this.setState({
          modelList: tmp,
          count
        })
        return resolve()
      })
    }).catch(e => {
      console.error(e)
    })
  }

  replace (c, id) {
    return new Promise(resolve => {
      setTimeout(() => {
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

        this.setState({
          modelList: tmpList
        })

        return resolve()
      })
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
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          pointerEvents='box-none'
          collapsable={false}>

          {
            modelList.map((item) => {
              const args = item.args || {}
              args.fullScreenPatch = args.fullScreenPatch || []

              return item.component ? React.cloneElement(item.component, {
                key: item.id
              }) : null
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
