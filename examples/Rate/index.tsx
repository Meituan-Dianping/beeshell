import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native'

import { Rate, Icon } from '../../src/'

import variables from '../customTheme'
import styles from '../common/styles'

const customIconSize = 20
// 本地图标地址
const customIcons = {
  empty: <View style={{ backgroundColor: '#eee', width: customIconSize, height: 40 }}></View>,
  half: <View style={{ backgroundColor: '#999', width: customIconSize, height: 40 }}></View>,
  full: <View style={{ backgroundColor: '#111', width: customIconSize, height: 40 }}></View>
}


export default class RateScreen extends Component<any, any> {
  constructor (p) {
    super(p)

    this.state = {
      value1: 2
      // rateNumber: 2.5,
      // exampleIcons: customIcons
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        value1: 0
      })
    }, 2000)

    // 动态修改 exampleIcons
    // setTimeout(() => {
    //   this.setState({
    //     exampleIcons: iconsCDN
    //   })
    // }, 1000)
  }

  rateChange (val) {
    // this.setState({ rateNumber: val })
  }

  render () {
    const { rateNumber, exampleIcons } = this.state
    return (
      <View style={styles.body}>

        <Text style={styles.header}>基础</Text>
        <View style={[styles.panel, { alignItems: 'center' }]}>
          <Text>value1: {this.state.value1}</Text>
          <Rate value={this.state.value1} onChange={(value) => this.setState({ value1: value })} />
        </View>

        <Text style={styles.header}>自定义图标大小、间距</Text>
        <View style={[styles.panel, { alignItems: 'center' }]}>
          <Text>value2: {this.state.value2}</Text>
          <Rate value={this.state.value2} iconSize={40} enableHalf iconSpace={15} onChange={value => this.setState({ value2: value }) } />
        </View>

        <Text style={styles.header}>自定义图标</Text>
        <View style={[styles.panel, { alignItems: 'center' }]}>
          <Text>value3: {this.state.value3 || 0}</Text>
          <Rate
            maximum={3}
            value={this.state.value3 || 0}
            icons={customIcons}
            iconSpace={80}
            iconSize={customIconSize}
            enableHalf={true}
            onChange={(value) => {
              this.setState({ value3: value })
            }}
          />
        </View>

      </View>
    )
  }
}
