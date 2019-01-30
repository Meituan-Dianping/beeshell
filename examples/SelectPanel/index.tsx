import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  InteractionManager,
} from 'react-native'

import { SelectPanel, SlideModal } from '../../src/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  introduction: {
    marginHorizontal: 15,
    marginTop: 15,
    flexDirection: 'column',
  },
  filterBtn: {
    height: 44,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FECB2E',
  },
  oneLine: {
    marginVertical: 8,
  },
  icon: {
    color: 'green',
    marginRight: 15,
  },
})

const demoData = require('./demoData.json')

export default class SelectPanelDemo extends Component<any, any> {
  btn = null
  _modal = null
  offsetX = 0
  offsetY = 0

  constructor(props) {
    super(props)
    this.state = {
      selectPanelInfo: JSON.parse(JSON.stringify(demoData)),
      result: '还没点~~',
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.btn.measure((ox, oy, width, height, px, py) => {
        this.setState({
          offsetX: px,
          offsetY: py + height
        })
      })
    })
  }

  onBtnPressed() {
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          ref={(c) => { this.btn = c }}
          style={styles.filterBtn}
          onPress={() => {
            this._modal.open()
          }}
        >
          <Text>点我</Text>
        </TouchableOpacity>
        <View style={styles.introduction}>
          <Text style={styles.oneLine}>排序/单选检索下拉组件,目前仅支持单选，数据可配置，结合popup来使用效果更佳</Text>
          <Text style={styles.oneLine}>你点击了:</Text>
          <Text style={styles.oneLine}>{this.state.result}</Text>
        </View>


        <SlideModal
          offsetY={this.state.offsetY || undefined}
          offsetX={this.state.offsetX || undefined}
          direction='down'
          ref={(c) => {
            this._modal = c
          }}
          cancelable
          // ref={(c) => {
          //   this._modal = c
          // }}
          // offsetX={this.offsetX || undefined}
          // offsetY={this.offsetY || undefined}
          // direction='down'
        >
          <SelectPanel
            selectPanelInfo={this.state.selectPanelInfo}
            onSelected={(selectedChoice, selectPanelInfo) => {
              this.setState({
                selectPanelInfo,
                result: JSON.stringify(selectedChoice),
              })
              this._modal.close()
            }}
          />
        </SlideModal>
      </View>
    )
  }
}
