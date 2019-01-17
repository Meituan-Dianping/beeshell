import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native'

import { Radio, Icon } from '../../src'

const styles = StyleSheet.create({
  title: {
    padding: 15,
    fontSize: 16
  },
  content: {
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  }
})

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

  renderItem (checked, label) {
    let color = checked ? 'red' : '#333'
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
        <Icon type='star' size={16} tintColor={color} />
        <Text style={{ fontSize: 16, marginLeft: 8, color: color }}>{label}</Text>
      </View>
    )
  }

  render () {
    return (
      <ScrollView>
        <Text style={styles.title}>左边图标</Text>
        <View style={styles.content}>
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

        <Text style={styles.title}>右边图标</Text>
        <View style={styles.content}>
          <Radio
            checkedValue={this.state.checkedValue2}
            onChange={(value) => {
              this.setState({
                checkedValue2: value
              })
            }}
            iconPosition='right'>
            <Radio.Item label='自配送' value={1} />
            <Radio.Item label='美团专送Disabled' value={2} disabled />
            <Radio.Item label='混合配送' value={3} />
          </Radio>
        </View>

        <Text style={styles.title}>自定义选项</Text>
        <View style={styles.content}>
          <Radio
            checkedValue={this.state.checkedValue3}
            onChange={(value) => {
              this.setState({
                checkedValue3: value
              })
            }}>
            <Radio.Item
              value={1}
              renderItem={(checked) => {
                return this.renderItem(checked, '选项一')
              }}
            />
            <Radio.Item
              value={2}
              renderItem={(checked) => {
                return this.renderItem(checked, '选项二')
              }}
            />
            <Radio.Item
              value={3}
              renderItem={(checked) => {
                return this.renderItem(checked, '选项三')
              }}
            />
          </Radio>
        </View>
      </ScrollView>
    )
  }
}
