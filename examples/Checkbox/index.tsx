import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Checkbox } from '../../src/'
import { EmitValueChangeProvider } from '../../src/common/utils/emitValueChangeContext'

import styles from '../common/styles'
import variables from '../customTheme'



export default class CheckboxScreen extends Component<{}, any> {
  constructor(props) {
    super(props)
    this.state = {
      address: ['v4'],
      job: [],
      job2: []
    }
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>
        <Text style={styles.header}>左边图标</Text>
        <View>
          <EmitValueChangeProvider
            value={(value) => {
            }}>
            <Checkbox
              style={{ paddingHorizontal: variables.mtdHSpacingXL }}
              checkedValue={this.state.address}
              onChange={(value) => {
                this.setState({
                  address: value
                })
              }}
              iconPosition='left'>
              <Checkbox.Item label='北京' value='v1' />
              <Checkbox.Item label='上海' value='v2' />
              <Checkbox.Item label='广州' value='v3' />
              <Checkbox.Item label='深圳（禁用）' value='v4' disabled={true}/>
            </Checkbox>
          </EmitValueChangeProvider>
        </View>


        <Text style={styles.header}>右边图标</Text>
        <Checkbox
          style={{ paddingHorizontal: variables.mtdHSpacingXL }}
          checkedValue={this.state.job}
          iconPosition='right'
          onChange={(value) => {
            this.setState({
              job: value
            })
          }}>
          <Checkbox.Item label='外卖' value='j1' />
          <Checkbox.Item label='团购' value='j2' />
          <Checkbox.Item label='酒旅' value='j3' />
        </Checkbox>

        <Text style={styles.header}>全选功能</Text>
        <Checkbox
          showAllChecked
          style={{ paddingHorizontal: variables.mtdHSpacingXL }}
          checkedValue={this.state.job2}
          iconPosition='right'
          onChange={(value) => {
            console.log(value)
            this.setState({
              job2: value
            })
          }}>
          <Checkbox.Item label='上午' value='a1' />
          <Checkbox.Item label='中午' value='a2' />
          <Checkbox.Item label='下午' value='a3' />
          <Checkbox.Item label='晚上' value='a4' />
        </Checkbox>
      </ScrollView>
    )
  }
}
