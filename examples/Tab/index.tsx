import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Tab } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'

export default class TabScreen extends Component<any, any> {

  constructor (props) {
    super(props)
    this.state = {
      value: 1,
      valueA: 1,
      valueC: 2,
      valueX: 1
    }
  }

  handleChange = (key, value: number) => {
    this.setState({
      [key]: value
    } as any)
  }

  getBgColor = (value) => {
    return this.state.valueX === value ? { backgroundColor: '#111111' } : {}
  }

  getFontColor = (value) => {
    return this.state.valueX === value ? { color: '#fff' } : { color: '#111' }
  }

  render () {
    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>基础</Text>
        <Tab
          value={this.state.value}
          data={[{
            value: 1,
            label: '全部'
          },
          {
            value: 2,
            label: '我关注的'
          },
          {
            value: 3,
            label: '我的粉丝'
          }]}
          onChange={ item => this.handleChange('value', item.value) }
        />

        <Text style={styles.header}>左对齐</Text>
        <Tab
          dataItemContainerStyle={{ flex: null }}
          value={this.state.valueA}
          data={[{
            value: 1,
            label: '我关注的'
          },
          {
            value: 2,
            label: '我的粉丝'
          }]}
          onChange={ item => this.handleChange('valueA', item.value) }
        />

        <Text style={styles.header}>横向可滚动</Text>
        <Tab
          value={this.state.valueC}
          scrollable={true}
          data={[
            {
              value: 1,
              label: '选项一'
            }, {
              value: 2,
              label: '选项二'
            }, {
              value: 3,
              label: '选项三'
            }, {
              value: 4,
              label: '选项四'
            }, {
              value: 5,
              label: '选项五'
            }
          ]}
          onChange={ item => this.handleChange('valueC', item.value) }
        />


        <Text style={styles.header}>自定义选项</Text>
        <Tab
          dataItemContainerStyle={{ flex: null }}
          value={this.state.valueX}
          data={[
            {
              value: 1,
              label: '选项1'
            },
            {
              value: 2,
              label: '选项2'
            },
            {
              value: 3,
              label: '选项3'
            }
          ]}
          renderItem={(item, index, selected) => {
            return (
              <View style={{ paddingVertical: variables.mtdVSpacingXL, paddingHorizontal: variables.mtdHSpacingXL }}>
                <View
                  style={{
                    padding: 5,
                    borderRadius: 2,
                    backgroundColor: selected ? variables.mtdGrayBase : variables.mtdFillBody,
                    justifyContent: 'center'
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: selected ? '#fff' : variables.mtdGrayBase,
                    }}>
                    {item.label}
                  </Text>
                </View>
              </View>
            )
          }}
          onChange={ item => this.handleChange('valueX', item.value) }
        />
      </ScrollView>
    )
  }
}
