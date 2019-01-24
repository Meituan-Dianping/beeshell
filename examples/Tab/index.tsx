import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Tab } from '../../src'

const styles = StyleSheet.create({
  containTitle: {
    fontSize: 30
  },
  title: {
    margin: 20,
    marginLeft: 0
  },
  content: {
    height: 50
  },
  customerDemoContain: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 3,
    backgroundColor: '#EBEBEB'
  }
})

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
      <ScrollView>
        <Text style={styles.containTitle}>基础Tab</Text>
        <View>
            <Text style={styles.title}>3个tab(3等分)</Text>
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
        </View>
        <Text style={[styles.containTitle, { marginTop: 30 }]}>衍生Tab</Text>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>2个tab(2等分)</Text>
          <Tab
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
          <Text style={styles.title}>3个tab(3等分)</Text>
          <Tab
              value={this.state.value2}
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
              onChange={ value => this.handleChange('value2', value) }
          />
          <Text style={styles.title}>4个tab(4等分)</Text>
          <Tab
              value={this.state.value3}
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
              },
              {
                value: 4,
                label: '总体评价'
              }]}
              onChange={ value => this.handleChange('value3', value) }
          />
          <Text style={styles.title}>4个tab(等间距)</Text>
          <Tab
              value={this.state.value4}
              isBalanced={false}
              justifyContent='space-between'
              options={[
                {
                  value: 1,
                  label: '门店信息'
                },
                {
                  value: 2,
                  label: '商家详情加长内容'
                },
                {
                  value: 3,
                  label: '商家评价加长内容'
                }
              ]}
              onChange={ value => this.handleChange('value4', value) }
          />
          <Text style={styles.title}>多个tab(固定tab间距离可滚动)</Text>
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
          <Text style={styles.title}>多个tab(间距固定，居左)</Text>
          <Tab
              value={this.state.value6}
              isBalanced={false}
              options={[
                {
                  value: 1,
                  label: '选项1'
                }, {
                  value: 2,
                  label: '选项2'
                }, {
                  value: 3,
                  label: '选项3'
                }
              ]}
              onChange={ value => this.handleChange('value6', value) }
          />
          <Text style={styles.title}>色块tab</Text>
          <Tab
              value={this.state.value7}
              isBalanced={false}
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
              renderItem={(item, selected, disabled, index) => {
                return <View style={[styles.customerDemoContain, this.getBgColor(item.value)]}>
                    <Text style={[{ fontSize: 12 }, this.getFontColor(item.value)]}>{item.label}</Text>
                </View>
              }}
              onChange={ value => this.handleChange('value7', value) }
          />
        </View>
      </ScrollView>
    )
  }
}
