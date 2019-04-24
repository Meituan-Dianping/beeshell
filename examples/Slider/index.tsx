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
        <View style={[styles.panel, { flexDirection: 'row' }]}>
          <Slider
            style={{ marginTop: 10 }}
            value={2}
            min={0}
            max={5}
            step={1}
            marks={['普通', '快速', '高速', '极速', '光速', 'VIP']}
            onChange={(value) => {
              console.log(value)
            }}
          />
        </View>

        <Text style={styles.header}>气泡滑块</Text>
        <View style={[styles.panel, { flexDirection: 'row' }]}>
          <Slider
            onChange={this.onHandleChange}
            max={1500}
            value={500}
            showTip={true}
          />
        </View>
        <Text style={styles.header}>禁用滑块</Text>
        <View style={[styles.panel, { flexDirection: 'row' }]}>
          <Slider
            max={1500}
            value={500}
            disabled={true}
          />
        </View>

        <Text style={styles.header}>自定义</Text>
        <View style={[styles.panel, { flexDirection: 'row' }]}>
          <Slider
            range
            trackColor={variables.mtdBrandPrimary}
            valueTrackColor={variables.mtdBrandSuccess}
            rangeValueTrackColor={variables.mtdBrandDanger}
            max={1500}
            value={[500, 1000]}
            disabled={false}
            showTip={true}
          />
        </View>

        <Text style={styles.header}>纵向</Text>
        <View style={[styles.panel, { height: 150, flexDirection: 'row' }]}>
          <Slider
            vertical
            max={1500}
            value={500}
            showTip={true}
          />
        </View>
      </View>
    )
  }
}
