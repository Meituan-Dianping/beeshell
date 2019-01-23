import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native'

import { Radio, Icon } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'

export default class RadioScreen extends Component<any, any> {
  [propsName: string]: any

  constructor (props) {
    super(props)
    this.state = {
      checkedValue: 1,
      checkedValue2: 2,
      checkedValue3: 3
    }
  }

  renderItem (checked, index, label) {
    let color = checked ? variables.mtdBrandDanger : variables.mtdGrayBase
    return (
      <View style={{ paddingVertical: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          { checked ? <Icon type='star' size={16} tintColor={color} /> : <View style={{ width: 16, height: 16 }}></View> }
          <Text style={{ fontSize: 14, marginLeft: 8, color: color }}>{label}</Text>
        </View>
        { index === 2 ? <Text style={{ color: variables.mtdGrayLighter, marginLeft: 24, fontSize: 12, marginTop: 5 }}>该选项风险较大，请谨慎选择</Text> : null }
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>左边图标</Text>

        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            checkedValue={this.state.checkedValue}
            onChange={(value) => {
              console.log(value)
              this.setState({
                checkedValue: value
              })
            }}>

            <Radio.Item label='选项A' value={0} />
            <Radio.Item label='选项B' value={1} />
            <Radio.Item label='选项C' value={2} />
          </Radio>
        </View>
        <View style={{ marginTop: 10 }}></View>

        <Text style={styles.header}>右边图标</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            checkedValue={this.state.checkedValue2}
            onChange={(value) => {
              this.setState({
                checkedValue2: value
              })
            }}
            iconPosition='right'>
            <Radio.Item label='自配送' value={1} />
            <Radio.Item label='美团专送（禁用）' value={2} disabled />
            <Radio.Item label='混合配送' value={3} />
          </Radio>
        </View>

        <Text style={styles.header}>自定义选项</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            checkedValue={this.state.checkedValue3}
            onChange={(value) => {
              this.setState({
                checkedValue3: value
              })
            }}>
            <Radio.Item
              value={1}
              label={(checked) => {
                return this.renderItem(checked, 0, '选项一')
              }}
            />
            <Radio.Item
              value={2}
              label={(checked) => {
                return this.renderItem(checked, 1, '选项二')
              }}
            />
            <Radio.Item
              value={3}
              label={(checked) => {
                return this.renderItem(checked, 2, '选项三')
              }}
            />
          </Radio>
        </View>
      </ScrollView>
    )
  }
}
