import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'

import { Stepper, Form } from '../../src/'
import variables from '../customTheme'

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
      max: 500,
      value: null
    }
  }
  handleChange = (value, oldValue, action) => {
    console.log(`value: ${value}, oldValue: ${oldValue}, action: ${action}`)
    this.setState({
      value
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </View>
          </Form.Item>

          <Form.Item
            style={{ paddingVertical: 13 }}
            labelWidth={120}
            label='自定义操作按钮'>

            <View style={{ alignItems: 'flex-end' }}>
              <Stepper
                operatorStyle={{ backgroundColor: variables.mtdBrandInfo, borderRadius: 15 }}
                operatorIconColor='#fff'
                min={min}
                max={max}
                value={value}
                editable={true}
                onChange={this.handleChange}
              />
            </View>
          </Form.Item>
        </Form>
      </ScrollView>
    )
  }
}
