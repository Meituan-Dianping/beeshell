import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Slider as RNSlider } from 'react-native'
import { Slider } from '../../src'

import variables from '../customTheme'
import styles from '../common/styles'

export default class SliderScreen extends Component<any, any> {
  constructor (p) {
    super(p)
    this.state = {
      valueL: 0,
      valueA: 2,
      valueX: [ 100, 800 ],
      disabled: false
    }
  }
  componentDidMount () {
    // setTimeout(() => {
    //   this.setState({
    //     valueA: 4,
    //     valueL: 300,
    //     disabled: true
    //   })
    // }, 2000)
  }
  handleChange = (value) => {
    console.log(value)
    this.setState({
      valueL: value
    })
  }
  render () {
    return (
      <View
        style={[styles.body]}>

        <Text style={styles.header}>标尺滑块</Text>
        <View style={[styles.panel]}>
          <Slider
            style={{ marginTop: 10 }}
            value={this.state.valueA}
            min={1}
            max={6}
            step={1}
            marks={['普通', '快速', '高速', '极速', '光速', 'VIP']}
            onChange={(value) => {
              console.log(value)
              this.setState({
                valueA: value
              })
            }}
          />
        </View>

        <Text style={styles.header}>气泡滑块</Text>
        <View style={[styles.panel]}>
          <Slider
            value={this.state.valueL}
            onChange={this.handleChange}
            max={1500}
            showTip={true}
          />
        </View>
        <Text style={styles.header}>禁用滑块</Text>
        <View style={[styles.panel]}>
          <Slider
            max={1500}
            value={500}
            minTrackColor={variables.mtdGrayLighter}
            disabled={true}
          />
        </View>

        <Text style={styles.header}>双滑块、自定义颜色、粗细</Text>
        <View style={[styles.panel]}>
          <Slider
            range
            maxTrackColor={variables.mtdGrayLightest}
            minTrackColor={variables.mtdGrayLightest}
            midTrackColor={this.state.disabled ? variables.mtdGrayLighter : variables.mtdBrandDanger}
            max={1500}
            trackWeight={20}
            value={this.state.valueX}
            disabled={this.state.disabled}
            showTip={true}
            onChange={(value) => {
              this.setState({
                valueX: value
              })
            }}
          />
        </View>

        <Text style={styles.header}>纵向</Text>
        <View style={[styles.panel, { height: 150, flexDirection: 'row' }]}>
          <Slider style={{ flex: 1, justifyContent: 'center' }} vertical max={1500} value={500} showTip={true}/>
          <Slider style={{ flex: 1, justifyContent: 'center' }} vertical max={100} value={50} showTip={true}/>
        </View>
      </View>
    )
  }
}
