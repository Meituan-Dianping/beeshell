import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Icon, Input, Form, Button, Checkbox, Switch, Radio } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'

const componentStyles = StyleSheet.create({
  header: {
    paddingHorizontal: variables.mtdHSpacingXl,
    paddingTop: 16,
    paddingBottom: 8
    color: variables.mtdGray,
  },
})


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
      <ScrollView
        style={styles.body}>
        <Text style={componentStyles.header}>基本信息</Text>
        <Form
          ref={(ref) => this.form = ref }
          model={this.state.model}
          rules={this.state.model}>
          <Form.Item
            prop='name'
            label={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: variables.formItemLabelWidth,
                  marginRight: variables.formItemLabelMarginRight
                }}>
                <Text style={{ color: variables.mtdBrandDanger, marginRight: 2 }}>*</Text>
                <Text>姓名</Text>
                <Icon style={{ marginLeft: 4 }} type='question-circle' size={14}></Icon>
              </View>
            }
            hasLine>
            <Input value={this.state.model.name} placeholder='姓名' onChange={this.handleNameChange} />
          </Form.Item>
          <Form.Item prop='email' label='邮箱' hasLine>
            <Input placeholder='请填写邮箱' onChange={this.handleEmailChange}/>
          </Form.Item>

          <Form.Item label='手机号码' hasLine>
            <Input placeholder='请填写手机号码' textAlign='right' onChange={() => {}}/>
            <Text style={{ color: variables.mtdGrayLighter, fontSize: 12, marginTop: 4 }}>该信息非常重要，请认真填写</Text>
          </Form.Item>
          <Form.Item prop='needPackage' label='是否开启定位' hasLine validateOnMount>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Switch value={this.state.model.needPackage} onChange={this.handlePackageChange}/>
            </View>
          </Form.Item>
          <Form.Item prop='deliveryTime' label='配送时间' hasLine>
            <View></View>
            <Checkbox
              style={{ marginTop: 5 }}
              checkedValues={this.state.model.deliveryTime}
              onChange={this.handleDeliveryChange}
              iconPosition='right'>
              <Checkbox.Item label='上午' trueValue='time_1' />
              <Checkbox.Item label='下午' trueValue='time_2' />
              <Checkbox.Item label='晚上' trueValue='time_3' />
            </Checkbox>
          </Form.Item>

          <Form.Item label='地址'>
            <View></View>
            <Radio
              checkedValue={this.state.address || 1}
              onChange={(value) => {
                this.setState({
                  address: value
                })
              }}
              style={{ marginTop: 5 }}
              iconPosition='right'>
              <Radio.Item label='北京' value={1} />
              <Radio.Item label='上海' trueValue={2} />
            </Radio>
          </Form.Item>
        </Form>
        <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 20 }}>
          <View style={{ flex: 1 }}>
            <Button
              type='primary'
              onPress={() => {
                this.handlePress()
              }}
              reverse>
              保存
            </Button>
          </View>
        </View>
      </ScrollView >
    )
  }
}
