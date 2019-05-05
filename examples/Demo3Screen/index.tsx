import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Input, Form, Button, Checkbox, Switch, Radio, Rate, Slider, Datepicker, BottomModal, Tab } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'
import validator from '../../src/common/utils/validator'

export default class Demo3Screen extends Component<{}, any> {
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
        <Tab></Tab>
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
