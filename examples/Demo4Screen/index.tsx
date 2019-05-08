import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Input, Form, Button, Stepper, Dropdown, Progress, Checkbox, Switch, Radio, Rate, Slider, Datepicker, BottomModal, Tab } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'
import validator from '../../src/common/utils/validator'

export default class Demo4Screen extends Component<{}, any> {
  [props: string]: any
  constructor (p) {
    super(p)
    this.state = {
      city: 1,
      job: [1, 2],
      value: 1,
      data: [
        {
          label: '我关注的',
          value: 1
        },
        {
          label: '离我最近',
          value: 2
        },
        {
          label: '综合评分最高的的的',
          value: 3
        }
      ]
    }
  }

  componentDidMount() {
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>
        <View style={[styles.panel, { paddingVertical: 0 }]}>
          <Radio
            style={{ flexDirection: 'row' }}
            value={this.state.city}
            onChange={(value) => {
              console.log(value)
              this.setState({
                city: value
              })
            }}>

            <Radio.Item style={{ minWidth: 100, marginRight: 12 }} label='Beijing' value={1} />
            <Radio.Item style={{ minWidth: 100, marginRight: 12 }} label='Shanghai' value={2} />
          </Radio>
        </View>

        <View style={[styles.panel, { marginTop: 10, paddingVertical: 0 }]}>
          <Checkbox
            style={{ flexDirection: 'row' }}
            value={this.state.job}
            onChange={(value) => {
              console.log(value)
              this.setState({
                job: value
              })
            }}>

            <Checkbox.Item style={{ minWidth: 100, marginRight: 12 }} label='meituan' value={1} />
            <Checkbox.Item style={{ minWidth: 100, marginRight: 12 }} label='waimai' value={2} />
          </Checkbox>
        </View>

        <View style={[styles.panel, { marginTop: 10 }]}>
          <Button
            testID='btn1'
            size='sm'
            ref={(c) => {
              this.btnEl = c
            }}
            onPress={() => {
              this.btnEl.measure((fx, fy, width, height, px, py) => {
                this.setState({
                  offsetX: px,
                  offsetY: py + height
                })
                this.dropdown.open()
              })
            }}>
            Dropdown
          </Button>

          <Dropdown
            ref={(c) => {
              this.dropdown = c
            }}
            offsetX={this.state.offsetX}
            offsetY={this.state.offsetY}
            cancelable={true}
            value={this.state.value}
            data={this.state.data}
            onChange={(value) => {
              this.setState({
                value
              })
            }}
          />
        </View>
      </ScrollView >
    )
  }
}
