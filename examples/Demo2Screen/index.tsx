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
        <Text style={styles.header}>基本信息</Text>
        <Form>
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
            <Input textAlign='right' value={'Lulu'} placeholder='姓名' onChange={(value) => { this.handleChangeFilter('name', value) }} />
            {/* <Text style={{ color: variables.mtdBrandDanger }}>{'请输入姓名'}</Text> */}
          </Form.Item>
          <Form.Item style={{ paddingVertical: 13 }} label='手机号码' hasLine>
            <Input placeholder='请填写手机号码' textAlign='right' value={'13333333333'} onChange={(value) => { this.handleChangeFilter('phone', value) }} />
            <Text style={{ color: variables.mtdGrayLighter, fontSize: 12, marginTop: 4 }}>该信息非常重要，请认真填写</Text>
          </Form.Item>
        </Form>
        <Text style={styles.header}>配送信息</Text>
        <Form>
          <Form.Item label='是否接收消息' hasLine>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Switch value={true} rockerSize='sm' activeColor={variables.mtdBrandPrimaryDark} />
            </View>
          </Form.Item>
          <Form.Item label='配送评分' hasLine>
            <Rate value={this.state.score} iconColor={variables.mtdBrandPrimaryDark} onChange={(value) => { this.setState({ score: value }) }}></Rate>
          </Form.Item>
          <Form.Item label='配送时间' hasLine>
            <View></View>
            <Checkbox
              style={{ marginTop: 5 }}
              value={['time_1', 'time_2']}
              onChange={null}
              iconPosition='left'>
              <Checkbox.Item label='上午' value='time_1' />
              <Checkbox.Item label='下午' value='time_2' />
            </Checkbox>
          </Form.Item>
          <Form.Item label='配送价格' hasLine>
            <Slider range min={0} max={20} value={[3, 17]} onChange={(value) => { console.log(value) }} showTip minTrackColor={variables.mtdFillGray} midTrackColor={variables.mtdBrandPrimaryDark} maxTrackColor={variables.mtdFillGray} />
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

        <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 20 }}>
          <View style={{ flex: 1 }}>
            <Button
              textColorInverse
              type='primary'>
              保存
            </Button>
          </View>
        </View>
      </ScrollView >
    )
  }
}
