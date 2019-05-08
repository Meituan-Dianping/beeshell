import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Input, Form, Button, Checkbox, Switch, Radio, Rate, Slider, Datepicker, BottomModal } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'
import validator from '../../src/common/utils/validator'

export default class Demo2Screen extends Component<{}, any> {
  [props: string]: any
  constructor (p) {
    super(p)
    this.state = {
      score: 3.5
    }
  }

  handleChangeFilter = (a, b) => {
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: variables.mtdBrandSuccessLight }}>
          <Icon type='check-circle' tintColor={variables.mtdBrandSuccessDark} />
          <Text style={{ marginLeft: 5, color: variables.mtdBrandSuccessDark }}>审核通过</Text>
        </View>
        <Text style={styles.header}>基本信息</Text>
        <Form>
          <Form.Item label='' hasLine>
            <View></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View
                style={{
                  width: 50, height: 50, padding: 10, borderRadius: 50, backgroundColor: variables.mtdFillBody, alignItems: 'center', justifyContent: 'center'
                }}>
                <Icon size='100%' type='camera-o' tintColor={variables.mtdGrayBase} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: variables.mtdGray }}>请上传头像</Text>
                <Icon type='angle-right' tintColor={variables.mtdGray} />
              </View>
            </View>
          </Form.Item>
          <Form.Item
            style={{ paddingVertical: 13 }}
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
                <Icon style={{ marginLeft: 4 }} type='question-circle' size={14} tintColor={variables.mtdGrayLighter}></Icon>
              </View>
            }
            hasLine>
            <Input textAlign='right' value={'Lulu.Sycay Andeab'} placeholder='姓名' onChange={(value) => { this.handleChangeFilter('name', value) }} />
            {/* <Text style={{ color: variables.mtdBrandDanger }}>{'请输入姓名'}</Text> */}
          </Form.Item>
          <Form.Item label='是否接收消息' hasLine>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Switch value={true} rockerSize='sm' activeColor={variables.mtdBrandPrimaryDark} />
            </View>
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='手机号码' hasLine>
            <Input placeholder='请填写手机号码' textAlign='right' value={'13333333333'} onChange={(value) => { this.handleChangeFilter('phone', value) }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Icon type='exclamation-circle-o' tintColor={variables.mtdGrayLighter} />
              <Text style={{ color: variables.mtdGrayLighter, fontSize: 12 }}>该信息非常重要，请认真填写</Text>
            </View>
          </Form.Item>
        </Form>
        <Text style={styles.header}>配送信息</Text>
        <Form>
          <Form.Item label='配送评分' hasLine>
            <View style={{ alignItems: 'flex-end' }}>
              <Rate value={this.state.score} iconColor={variables.mtdBrandPrimaryDark} onChange={(value) => { this.setState({ score: value }) }}></Rate>
            </View>
          </Form.Item>
          <Form.Item
            style={{ paddingVertical: 0 }}
            label={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 5 }} type='clock-o' tintColor={variables.mtdGrayBase} />
                <Text>配送时间</Text>
              </View>
            }
            hasLine>
            <View style={{ alignItems: 'flex-end' }}>
              <Checkbox
                style={{ flexDirection: 'row' }}
                value={['time_1', 'time_2']}
                onChange={null}
                iconPosition='left'>
                <Checkbox.Item style={{ marginRight: 5 }} label='上午' value='time_1' />
                <Checkbox.Item label='下午' value='time_2' />
              </Checkbox>
            </View>
          </Form.Item>
          <Form.Item label='日期' hasLine>
            <TouchableOpacity
              style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}
              onPress={() => {
                this._bottomModal.open()
              }}>
              <Text style={{ color: variables.mtdGray }}>请点击选择</Text>
              <Icon type='angle-right' size={14} tintColor={variables.mtdGray}></Icon>
            </TouchableOpacity>
          </Form.Item>
        </Form>

        <BottomModal
          ref={(c) => {
            this._bottomModal = c
          }}>
          <Datepicker />
          <View style={{ height: 50 }}></View>
        </BottomModal>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }}>
          <Button type='default'>上一步</Button>
          <Button textColorInverse type='primary'>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, marginRight: 5, color: variables.mtdGrayBase }}>保存</Text>
              <Icon type='external-link' tintColor={variables.mtdGrayBase} />
            </View>
          </Button>
        </View>
      </ScrollView >
    )
  }
}
