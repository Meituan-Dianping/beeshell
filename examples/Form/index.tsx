import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'

import { Input, Form, Button, Checkbox, Switch } from '../../src'

export default class FormScreen extends Component<{}, any> {
  form = null
  constructor (p) {
    super(p)
    this.state = {
      model: {
        deliveryTime: ['time_1'],
        name: 'bob.yao',
        store: '',
        email: '',
        needPackage: false
      },
      rules: {
        // 姓名
        name: [
          { type: 'string', required: true, pattern: /^\D*$/, message: '请填写姓名,不允许数字', trigger: 'change' },
          { type: 'string', required: true, max: 8, min: 2, message: '姓名2-8字', trigger: 'change' }
        ],
        // 检查包装
        needPackage (rule, value, callback, source, options) {
          let errors = []
          if (value !== true) {
            errors.push(new Error('必须选中'))
          }
          callback(errors)
        },
        // 邮箱
        email: [
          { type: 'string', required: true, message: '请填写邮箱(加载时校验)', trigger: 'change' },
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        deliveryTime: [
          { type: 'array', required: true, max: 2, min: 1, message: '送餐时间段必填, 而且不能多于2个', trigger: 'change' }
        ]
      }
    }
  }

  handleDebounce = (val) => {
    this.setState({
      userInputValue: val
    })
  }

  handleNameChange = (name) => {
    this.setState({
      model: { ...this.state.model, name }
    })
  }

  handleEmailChange = (email) => {
    this.setState({
      model: { ...this.state.model, email }
    })
  }

  handleEmailBlur = (e) => {
    console.log(e.target)
    this.setState({
      model: { ...this.state.model, email: e.target }
    })
  }

  handleDeliveryChange = (deliveryTime) => {
    console.log(deliveryTime)
    this.setState({
      model: { ...this.state.model, deliveryTime }
    })
  }

  handlePackageChange = (needPackage) => {
    this.setState({
      model: { ...this.state.model, needPackage }
    })
  }

  handlePress () {
    this.form.validate((valid) => {
      if (valid) {
        console.log('校验成功')
      } else {
        console.log('校验失败')
      }
    })
  }

  render () {
    return (
      <ScrollView>
        <Form model={this.state.model} ref={(ref) => this.form = ref }
          rules = {this.state.model}
        >
          <Form.Item
            prop='name'
            label='名字'
            showValidation
          >

          </Form.Item>
          <View style={{ backgroundColor: 'cyan', paddingLeft: 30, paddingRight: 30 }}>
            <Form.Item prop='name' label='姓名' hasLine>
              <Input value={this.state.model.name} onChange={this.handleNameChange} />
            </Form.Item>
          </View>
          <Form.Item prop='email' label='邮箱'>
            <Input placeholder='邮箱'
              onChange={this.handleEmailChange}
            />
          </Form.Item>
          <Form.Item prop='needPackage' label='是否需要包装' hasLine validateOnMount>
            <Switch value={this.state.model.needPackage} onChange={this.handlePackageChange}/>
          </Form.Item>
          <Form.Item prop='deliveryTime' label='配送时间' hasLine>
            <Checkbox
                checkedValues={this.state.model.deliveryTime}
                onChange={this.handleDeliveryChange}
                iconPosition='right'
              >
              <Checkbox.Item label='PM12:00-01:00' trueValue='time_1' />
              <Checkbox.Item label='PM06:00-07:00' trueValue='time_2' />
              <Checkbox.Item label='PM09:00-10:00' trueValue='time_3' />
            </Checkbox>
          </Form.Item>
        </Form>
        <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 20 }}>
          <View style={{ flex: 1 }}>
            <Button
              type='primary'
              onPress={() => {
                this.handlePress()
              }}>
              校验保存
            </Button>
          </View>
        </View>
      </ScrollView >
    )
  }
}
