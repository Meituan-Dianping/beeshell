import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'

import { Stepper, Form } from '../../src/'

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  containerTitle: {
    marginHorizontal: 10,
    paddingVertical: 20
  },
  containerTitleText: {
    color: '#202325',
    fontSize: 24
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc'
  }
})

export interface State {
  min: number,
  max: number,
  value: number
}

export default class StepperScreen extends Component<any, State> {
  constructor (p) {
    super(p)
    this.state = {
      min: 1,
      max: 1000,
      value: null
    }
  }
  onChange = (value, oldValue, action) => {
    console.log(value, oldValue, action)
    this.setState({
      value: value
    })
  }
  render () {
    const { min, max, value } = this.state
    return (
      <ScrollView>
        <Form>
          <Form.Item
            style={{ paddingVertical: 13 }}
            label='基础'
            hasLine>

            <View style={{ alignItems: 'flex-end' }}>
              <Stepper
                min={min}
                max={max}
                value={value}
                onChange={this.onChange}
              />
            </View>
          </Form.Item>

          <Form.Item
            style={{ paddingVertical: 13 }}
            labelWidth={120}
            label='可编辑'
            hasLine>

            <View style={{ alignItems: 'flex-end' }}>
              <Stepper
                min={min}
                max={max}
                value={value}
                editable={true}
                onChange={this.onChange}
              />
            </View>
          </Form.Item>

          <Form.Item
            style={{ paddingVertical: 13 }}
            labelWidth={120}
            label='自定义操作按钮'>

            <View style={{ alignItems: 'flex-end' }}>
              <Stepper
                operatorStyle={{ borderRadius: 15 }}
                min={min}
                max={max}
                value={value}
                editable={true}
                onChange={this.onChange}
              />
            </View>
          </Form.Item>
        </Form>
      </ScrollView>
    )
  }
}
