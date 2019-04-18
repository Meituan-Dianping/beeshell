import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native'

import { FilterPanel, SlideModal, Button } from '../../src/'
import styles from '../common/styles'
const demoData = require('./TagData.json')

export default class TagSelectDemo extends Component<any, any> {
  private _modal = null

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

  modyfyCommonLabels = (labels) => {
    // Popup.hide()
    this.onFilterConfirm(labels)
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
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <Button
            size='sm'
            style={{ marginTop: 12 }}
            type='primary'
            reverse
            onPress={() => {
              this._modal.open()
            }}
          >
            点击
          </Button>

          <SlideModal
            offsetY={85}
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
      </ScrollView>
    )
  }
}
