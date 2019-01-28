import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'

import { Badge } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'

export default class BadgeScreen extends Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      exampleData: {
        numberList: [1, 36, 99],
        textList: ['减', '领券', '双旦大促'],
        triangleText: '优惠'
      }
    }
  }
  render () {
    const { numberList, textList, triangleText } = this.state.exampleData
    return (
      <ScrollView style={styles.body}>
        <Text style={styles.header}>红点</Text>
        <View style={styles.panel}>
          <Badge type={'dot'}/>
        </View>

        <Text style={styles.header}>面型角标</Text>
        <View style={[styles.panel, { flexDirection: 'row' }]}>
          {
            numberList.map((item, index) => {
              return (
                <Badge style={{ marginRight: 3 }} key={index} title={item} />
              )
            })
          }
          {
            textList.map((item, index) => {
              return (
                <Badge style={{ marginRight: 3 }} key={index} title={item} />
              )
            })
          }

          {
            numberList.map((item, index) => {
              return (
                <Badge style={{ marginRight: 3 }} key={index} title={item} textWrapperStyle={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 8 }}/>
              )
            })
          }
        </View>

        <Text style={styles.header}>线型角标</Text>
        <View style={[styles.panel, { flexDirection: 'row' }]}>
          {
            numberList.map((item, index) => {
              return (
                <Badge
                  style={{ marginRight: 3 }} key={index} title={item}
                  textWrapperStyle={{ backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, borderColor: variables.mtdBrandDanger }}
                  textContentStyle={{ color: variables.mtdBrandDanger }}
                />
              )
            })
          }

          {
            textList.map((item, index) => {
              return (
                <Badge
                  style={{ marginRight: 3 }} key={index} title={item}
                  textWrapperStyle={{ backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, borderColor: variables.mtdBrandDanger, borderBottomLeftRadius: 0, borderTopLeftRadius: 8 }}
                  textContentStyle={{ color: variables.mtdBrandDanger }}
                />
              )
            })
          }
        </View>

        <Text style={styles.header}>三角形角标</Text>
        <View style={[styles.panel, { flexDirection: 'row' }]}>
          <Badge type={'triangle'} title={triangleText}/>
        </View>
      </ScrollView>
    )
  }
}
