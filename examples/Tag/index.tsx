import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'

import { Tag } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'


export default class TagScreen extends Component<any, any> {

  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      autoplay: true
    }
  }

  indexChange (index) {
    this.setState({
      currentIndex: index
    })
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>

        <Text style={styles.header}>基础</Text>
        <View style={[ styles.panel, { flexDirection: 'row', flexWrap: 'wrap' } ]}>
          <Tag style={{ marginRight: 5, marginBottom: 5 }} type='default'>默认 default</Tag>
          <Tag style={{ marginRight: 5, marginBottom: 5 }} type='primary' textColorInverse>首选项 primary</Tag>
          <Tag style={{ marginRight: 5, marginBottom: 5 }} type='success'>成功 success</Tag>
          <Tag style={{ marginRight: 5 }} type='info'>一般信息 info</Tag>
          <Tag style={{ marginRight: 5 }} type='warning'>警告 warning</Tag>
          <Tag style={{ marginRight: 5 }} type='danger'>危险 danger</Tag>
        </View>

        <Text style={styles.header}>自定义样式</Text>
        <View style={[ styles.panel, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>自定义圆角</Tag>

          <Tag style={{ marginRight: 5, marginBottom: 5, borderColor: '#ffadd2', backgroundColor: '#fff0f6' }} textStyle={{ color: '#eb2f96' }}>自定义颜色 magenta</Tag>
          <Tag style={{ marginRight: 5, marginBottom: 5, borderColor: '#ffa39e', backgroundColor: '#fff0f6' }} textStyle={{ color: '#f5222d' }}>自定义颜色 red</Tag>
          <Tag style={{ marginRight: 5, borderColor: '#91d5ff', backgroundColor: '#e6f7ff' }} textStyle={{ color: '#1890ff' }}>自定义颜色 blue</Tag>
        </View>
      </ScrollView>
    )
  }
}
