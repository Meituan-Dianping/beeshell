import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'

import { Badge } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'

export default class BadgeScreen extends Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      list: [1, 0, 5, 9, 'A', 99, '减', '领券', '双旦大促'],
    }
  }
  render () {
    const { list } = this.state
    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>基础</Text>
        <View style={[styles.panel, { flexDirection: 'row' }]}>
          {
            list.map((item, index) => {
              return (
                <Badge style={{ marginRight: 3 }} key={index} label={item} />
              )
            })
          }
        </View>

        <Text style={styles.header}>Mini</Text>
        <View style={[styles.panel, { flexDirection: 'row' }]}>
          {
            list.map((item, index) => {
              return (
                <Badge style={{ marginRight: 3 }} key={index} />
              )
            })
          }
        </View>

        <Text style={styles.header}>自定义样式</Text>
        <View style={[styles.panel, { flexDirection: 'row', alignItems: 'center' }]}>
          {
            list.slice(0, 5).map((item, index) => {
              return (
                <Badge
                  key={index}
                  style={{ marginRight: 3, backgroundColor: 'transparent', borderColor: variables.mtdBrandPrimaryDark }}
                  label={item}
                  labelStyle={{ color: variables.mtdBrandPrimaryDark }}
                />
              )
            })
          }

          {
            list.slice(5, 9).map((item, index) => {
              return (
                <Badge
                  key={index}
                  style={{ marginRight: 3, backgroundColor: variables.mtdBrandInfo, borderColor: variables.mtdBrandInfo }}
                  label={item}
                />
              )
            })
          }
          <Badge style={{ marginRight: 3, backgroundColor: variables.mtdBrandSuccess }}/>
          <Badge style={{ marginRight: 3, backgroundColor: variables.mtdBrandWarning }}/>
          <Badge style={{ marginRight: 3, backgroundColor: variables.mtdBrandPrimary }}/>
        </View>
        <Text style={styles.header}>组合使用</Text>
        <View style={[styles.panel, { flexDirection: 'row', alignItems: 'center' }]}>
          <View style={{ width: 50, height: 50, marginRight: 10, backgroundColor: variables.mtdGrayLight, borderRadius: 4 }}>
            <Badge style={{ position: 'absolute', top: 0, right: 0 }}/>
          </View>

          <View style={{ width: 50, height: 50, backgroundColor: variables.mtdGrayLight, borderRadius: 4 }}>
            <Badge style={{ position: 'absolute', top: -5, right: -5 }} label='99+'/>
          </View>
        </View>
      </ScrollView>
    )
  }
}
