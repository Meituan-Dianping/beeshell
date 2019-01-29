import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native'

import { FilterPanel, SlideModal } from '../../src/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  introduction: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  filterBtn: {
    height: 44,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FECB2E',
  },
})

const demoData = require('./TagData.json')

export default class TagSelectDemo extends Component<any, any> {
  _modal = null

  constructor(props) {
    super(props)
    this.state = {
      filterPanelInfo: JSON.parse(JSON.stringify(demoData)),
      hasCommonLabel: true,
      commonLabels: [
        {
          'label_name': '美食',
          'label_id': 10368
        },
        {
          'label_name': '美团跑腿',
          'label_id': 10398
        }],
    }
  }

  componentWillUnmount() {
    // 使用popup时 注意卸载
    // Popup.hide();
    this._modal.close()
  }

  modyfyCommonLabels = (labels) => {
    // Popup.hide()
    this.onFilterConfirm(labels)
  }

  onFilterBtnPressed() {
    this._modal.open()
  }

  onFilterConfirm(result) {
    Alert.alert(
      '点击确定返回result',
      `选中ID： ${result}`,
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={this.onFilterBtnPressed.bind(this)}
        >
          <Text>点我</Text>
        </TouchableOpacity>
        <View style={styles.introduction}>
          <Text>标签筛选组件,支持多选和单选,数据可配置，结合popup来使用效果更佳</Text>
        </View>

        <SlideModal
          offsetY={130}
          direction='down'
          ref={(c) => {
            this._modal = c
          }}
          cancelable
        >
          <FilterPanel
            panelMaxHeight={500}
            activeExpand
            hasCommonLabals={this.state.hasCommonLabel}
            commonLabels={this.state.commonLabels}
            modyfyCommonLabels={this.modyfyCommonLabels}
            filterPanelInfo={this.state.filterPanelInfo}
            onConfirm={(result, filterPanelInfo) => {
              this.onFilterConfirm(result)
              // 配合popup来使用时需要在完成选择后设置一下filterPanelInfo 来进行下一次的回显，因为popuphide会销毁这个组件
              this.setState({
                filterPanelInfo,
              })
              // Popup.hide();
            }}
          />
        </SlideModal>
      </View>
    )
  }
}
