import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'

import { Badge } from '../../src'

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#fff'
  },
  rowLine: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  container: {
  },
  title: {
    marginBottom: 37
  },
  titleText: {
    color: '#666',
    fontSize: 16
  },
  content: {
    marginBottom: 15
  },
  contentText: {
    color: '#999',
    fontSize: 12
  },
  item: {
    marginHorizontal: 20
  }
})

export interface State {
  exampleData: {
    numberList: Array<number>,
    textList: Array<string>,
    triangleText: string
  }
}

export default class BadgeScreen extends Component<any, State> {
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
      <View style={styles.root}>
      <ScrollView>

       <View style={styles.container}>
          <View style={styles.title}><Text style={styles.titleText}>红点</Text></View>
          <View style={styles.content}>
            <View style={styles.rowLine}>
              <Badge type={'dot'}/>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.title}><Text style={styles.titleText}>面型角标</Text></View>
          <View style={styles.content}>
            <View style={styles.rowLine}>
              <Text style={styles.contentText}>数字</Text>
              { numberList.map(item => (<View style={styles.item}>><Badge title={item} /></View>)) }
            </View>
            <View style={styles.rowLine}>
              <Text style={styles.contentText}>文字</Text>
              { textList.map(item => (<View style={styles.item}><Badge title={item} /></View>)) }
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.rowLine}>
              <Text style={styles.contentText}>数字</Text>
              { numberList.map(item => (<View style={styles.item}><Badge title={item} textWrapperStyle={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 8 }}/></View>)) }
            </View>
            <View style={styles.rowLine}>
              <Text style={styles.contentText}>文字</Text>
              { textList.map(item => (<View style={styles.item}><Badge title={item} textWrapperStyle={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 8 }} /></View>)) }
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.title}><Text style={styles.titleText}>线型角标</Text></View>
          <View style={styles.content}>
            <View style={styles.rowLine}>
              <Text style={styles.contentText}>数字</Text>
              { numberList.map(item => (<View style={styles.item}>><Badge title={item} textWrapperStyle={{ backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, borderColor: '#FF301A' }} textContentStyle={{ color: '#FF301A' }} /></View>)) }
            </View>
            <View style={styles.rowLine}>
              <Text style={styles.contentText}>文字</Text>
              { textList.map(item => (<View style={styles.item}><Badge title={item} textWrapperStyle={{ backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, borderColor: '#FF301A' }} textContentStyle={{ color: '#FF301A' }} /></View>)) }
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.rowLine}>
              <Text style={styles.contentText}>数字</Text>
              { numberList.map(item => (<View style={styles.item}>><Badge title={item} textWrapperStyle={{ backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, borderColor: '#FF301A', borderBottomLeftRadius: 0, borderTopLeftRadius: 8 }} textContentStyle={{ color: '#FF301A' }}/></View>)) }
            </View>
            <View style={styles.rowLine}>
              <Text style={styles.contentText}>文字</Text>
              { textList.map(item => (<View style={styles.item}><Badge title={item} textWrapperStyle={{ backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, borderColor: '#FF301A', borderBottomLeftRadius: 0, borderTopLeftRadius: 8 }} textContentStyle={{ color: '#FF301A' }} /></View>)) }
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.title}><Text style={styles.titleText}>三角形角标</Text></View>
          <View style={styles.content}>
            <View style={styles.rowLine}>
              <Badge type={'triangle'} title={triangleText}/>
            </View>
          </View>
        </View>
        </ScrollView>

      </View>
    )
  }
}
