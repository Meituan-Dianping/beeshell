import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Slider as RNSlider } from 'react-native'
import { Slider } from '../../src'

import variables from '../customTheme'
import styles from '../common/styles'

export default class SliderScreen extends Component<any, any> {
  constructor (p) {
    super(p)
    this.state = {
      sliderValue: 0
    }
  }
  onHandleChange = (value) => {
    console.log(value)
    this.setState({
      sliderValue: value
    })
  }
  render () {
    return (
      <View
        style={[styles.body]}>

        <Text style={styles.header}>标尺滑块</Text>
        <View style={styles.panel}>
          {/*<RNSlider
            minimumValue={1}
            minimumTrackTintColor='red'
            maximumTrackTintColor='blue'
            maximumValue={10}
            step={1}
            onValueChange={(value) => {
              console.log(value)
            }}
            onSlidingComplete={(value) => {
              console.log(value)
            }}>
          </RNSlider>*/}
          <Slider
            style={{ marginTop: 10 }}
            value={2}
            minValue={0}
            maxValue={5}
            step={1}
            markOtptions={['普通', '快速', '高速', '极速', '光速', 'VIP']}
            onChange={(value) => {
              console.log(value)
            }}
          />
        </View>

        <Text style={styles.header}>双滑块</Text>
        <View style={styles.panel}>
          <Slider
            onChange={this.onHandleChange}
            isRange={true}
            maxValue={1500}
            value={500}
            otherValue={1000}
          />
        </View>
        <Text style={styles.header}>气泡滑块</Text>
        <View style={styles.panel}>
          <Slider
            onChange={this.onHandleChange}
            maxValue={1500}
            value={500}
            showTip={true}
          />
        </View>
        <Text style={styles.header}>禁用滑块</Text>
        <View style={styles.panel}>
          <Slider
            maxValue={1500}
            value={500}
            disabled={true}
          />
        </View>

        <Text style={styles.header}>自定义</Text>
        <View style={styles.panel}>
          <Slider
            isRange
            maxTrackColor={variables.mtdBrandPrimary}
            minTrackColor={variables.mtdBrandSuccess}
            rangeMinTrackColor={variables.mtdBrandDanger}
            maxValue={1500}
            value={500}
            otherValue={1000}
            disabled={false}
          />
        </View>
      </View>
    )
  }
}
