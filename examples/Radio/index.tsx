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
      valueA: 0,
      valueB: 2,
      valueC: 3
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        valueA: 1
      })
    }, 2000)
  }

  renderItem (checked, index, label) {
    let color = checked ? variables.mtdBrandDanger : variables.mtdGrayBase
    return (
      <View style={{ paddingVertical: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          { checked ? <Icon type='star' size={16} tintColor={color} /> : <Icon type='star-o' size={16} tintColor={color} /> }
          <Text style={{ fontSize: 14, marginLeft: 8, color: color }}>{label}</Text>
          { index === 0 ? <Icon style={{ marginLeft: 5 }} type='question-circle' tintColor={variables.mtdGrayLighter} /> : null }
        </View>
        { index === 1 ? <Text style={{ color: variables.mtdGrayLighter, marginLeft: 24, fontSize: 12, marginTop: 5 }}>该选项风险较大，请谨慎选择</Text> : null }
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>左边图标</Text>

        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueA}
            onChange={(value) => {
              console.log(value)
              this.setState({
                valueA: value
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
            value={this.state.valueB}
            onChange={(value) => {
              this.setState({
                valueB: value
              })
            }}
            iconPosition='right'>
            <Radio.Item label='选项一' value={1} />
            <Radio.Item label='选项二（禁用）' value={2} disabled />
            <Radio.Item label='选项三' value={3} />
          </Radio>
        </View>

        <Text style={styles.header}>自定义图标</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueC}
            checkedIcon={<Icon type='star' size={20} tintColor={variables.mtdBrandPrimaryDark} />}
            uncheckedIcon={<Icon type='star' size={20} tintColor={variables.mtdGrayLightest}}
            onChange={(value) => {
              this.setState({
                valueC: value
              })
            }}>
            <Radio.Item value={1} label='选项一' />
            <Radio.Item value={2} label='选项二'/>
            <Radio.Item value={3} label='选项三' />
          </Radio>
        </View>

        <Text style={styles.header}>自定义渲染项</Text>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            value={this.state.valueD}
            onChange={(value) => {
              this.setState({
                valueD: value
              })
            }}>
            <Radio.Item
              value={1}
              renderItem={(checked) => {
                return this.renderItem(checked, 0, '选项一')
              }}
            />
            <Radio.Item
              value={2}
              renderItem={(checked) => {
                return this.renderItem(checked, 1, '选项二')
              }}
            />
            <Radio.Item
              value={3}
              renderItem={(checked) => {
                return this.renderItem(checked, 2, '选项三')
              }}
            />
          </Radio>
        </View>
      </ScrollView>
    )
  }
}
