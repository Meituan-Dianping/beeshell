import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native'

import { Rate, Icon } from '../../src/'

import variables from '../customTheme'
import styles from '../common/styles'


const iconsCDN = {
  // emptyStar: <Icon type='star' tintColor='#efefef' />,
  // halfStar: <Icon type='star' />,
  // fullStar: <Icon type='star' tintColor='#4d73ff' />
}

// 本地图标地址
const iconsLocal = {
  // emptyStar: <Image source={require('./images/star-empty.png')} />,
  // halfStar: <Image source={require('./images/star-half.png')} />,
  // fullStar: <Image source={require('./images/star-filled.png')} />
}


export default class RateScreen extends Component<Props, State> {
  constructor (p) {
    super(p)

    this.state = {
      // rateNumber: 2.5,
      // exampleIcons: iconsLocal
    }
  }

  componentDidMount () {
    // // 动态修改 rateNumber
    // setTimeout(() => {
    //   this.setState({
    //     rateNumber: 1
    //   })
    // }, 2000)

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
          <Rate value={3} onChange={e => console.log(e)} />
        </View>

        <Text style={styles.header}>自定义图标颜色、大小、间距</Text>
        <View style={[styles.panel, { alignItems: 'center' }]}>
          <Rate value={5} starSize={40} starColor={variables.mtdBrandDanger} marginOfStar={15} onChange={e => console.log(e)} />
        </View>
      </View>
    )
  }
}
