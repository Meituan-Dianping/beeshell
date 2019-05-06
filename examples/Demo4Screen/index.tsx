import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Input, Form, Button, Stepper, Tip, Progress, Checkbox, Switch, Radio, Rate, Slider, Datepicker, BottomModal, Tab } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'
import validator from '../../src/common/utils/validator'

export default class Demo4Screen extends Component<{}, any> {
  [props: string]: any
  constructor (p) {
    super(p)
    this.state = {
      tabValue: 1,
      score: 3.5,
      city: 1,
      job: [1, 2],
      step: 1
    }
  }

  componentDidMount() {
    Tip.show('Success', 2000000000, true)

    this._bottomModal.open()
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>
        <Tab
          activeColor={variables.mtdBrandPrimary}
          value={this.state.tabValue}
          data={[
            { label: 'Tab 1', value: 1 },
            { label: 'Tab 2', disabled: false, value: 2 },
            { label: 'Tab disabled', disabled: true, value: 3 }
          ]}
          onChange={(item) => {
            this.setState({
              tabValue: item.value
            })
          }}
        />

        <Form style={{ marginTop: 10 }}>
          <Form.Item style={{ paddingVertical: 12 }} label='Isopen' hasLine>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Switch value={true} rockerSize='lg' activeColor={variables.mtdBrandPrimary} />
            </View>
          </Form.Item>
          <Form.Item label='Progress' hasLine>
            <Progress style={{ backgroundColor: variables.mtdGrayLightest }} barStyle={{ height: 3 }} percent={75} />
          </Form.Item>

          <Form.Item label='Rate' hasLine>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Rate value={this.state.score} onChange={(value) => { this.setState({ score: value }) }} />
            </View>
          </Form.Item>

          <Form.Item style={{ paddingVertical: 0 }} label='City' hasLine>
            <Radio
              style={{ flexDirection: 'row' }}
              value={this.state.city}
              onChange={(value) => {
                this.setState({
                  city: value
                })
              }}>
              <Radio.Item style={{ marginRight: 10 }} label='Beijing' value={1} />
              <Radio.Item label='Shanghai' value={2} />
            </Radio>
          </Form.Item>

          <Form.Item style={{ paddingVertical: 0 }} label='Job' hasLine>
            <Checkbox
              style={{ flexDirection: 'row' }}
              value={this.state.job}
              onChange={(value) => {
                this.setState({
                  job: value
                })
              }}>
              <Checkbox.Item style={{ marginRight: 10 }} label='meituan' value={1} />
              <Checkbox.Item label='waimai' value={2} />
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ paddingVertical: 12 }} label='Stepper'>
            <View style={{ alignItems: 'flex-end' }}>
              <Stepper
                operatorIconColor='#fff'
                min={1}
                max={5}
                value={this.state.step}
                editable={true}
                onChange={(value) => {
                  this.setState({
                    step: value
                  })
                }}
              />
            </View>
          </Form.Item>
        </Form>

        <BottomModal
          ref={(c) => {
            this._bottomModal = c
          }}
          backdropColor='rgba(0, 0, 0, 0)'
          style={{ borderTopWidth: StyleSheet.hairlineWidth, borderColor: variables.mtdBorderColorDarker }}
          title='Options'
          leftLabelText='cancel'
          rightLabelText='confirm'>
          <Datepicker />
          <View style={{ height: 30 }}></View>
        </BottomModal>

        <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 20 }}>
          <View style={{ flex: 1 }}>
            <Button type='primary' onPress={() => { this._bottomModal.open() }}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView >
    )
  }
}
