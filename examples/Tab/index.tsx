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
      value1: 1,
      value2: 1,
      value3: 1,
      value4: 1,
      value5: 2,
      value6: 1,
      value7: 1
    }
  }

  handleChange = (key, value: number) => {
    this.setState({
      [key]: value
    } as any)
  }

  getBgColor = (value) => {
    return this.state.value7 === value ? { backgroundColor: '#111111' } : {}
  }

  getFontColor = (value) => {
    return this.state.value7 === value ? { color: '#fff' } : { color: '#111' }
  }

  render () {
    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>基础</Text>
        <Tab
          value={this.state.value}
          options={[{
            value: 1,
            label: '门店信息'
          },
          {
            value: 2,
            label: '商家详情'
          },
          {
            value: 3,
            label: '商家评价'
          }]}
          onChange={ value => this.handleChange('value', value) }
        />

        <Text style={styles.header}>左对齐</Text>
        <Tab
          optionItemContainerStyle={{ flex: null }}
          value={this.state.value1}
          options={[{
            value: 1,
            label: '按商家展示'
          },
          {
            value: 2,
            label: '按任务展示'
          }]}
          onChange={ value => this.handleChange('value1', value) }
        />

        <Text style={styles.header}>横向可滚动</Text>
        <Tab
          value={this.state.value5}
          scrollable={true}
          options={[
            {
              value: 1,
              label: '商家运营'
            }, {
              value: 2,
              label: '工作要求'
            }, {
              value: 3,
              label: '拉新培训'
            }, {
              value: 4,
              label: '新签入驻'
            }, {
              value: 5,
              label: '新签入驻1'
            }
          ]}
          onChange={ value => this.handleChange('value5', value) }
        />


        <Text style={styles.header}>自定义选项</Text>
        <Tab
          optionItemContainerStyle={{ flex: null }}
          value={this.state.value7}
          options={[
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
          onChange={ value => this.handleChange('value7', value) }
        />
      </ScrollView>
    )
  }
}
