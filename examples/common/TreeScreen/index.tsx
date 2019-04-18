import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Animated } from 'react-native'

import { FadeAnimated, SlideAnimated } from '../../../src/common/animations'
import { Button } from '../../../src'

import styles from '../../common/styles'
import variables from '../../customTheme'
import Tree from '../../../src/common/utils/Tree'

const fieldKeys = {
  idKey: 'id',
  pIdKey: 'pId',
  childrenKey: 'children'
}

const nestedData = [
  {
    label: '北京',
    id: 'beijing',
    children: [
      { label: '朝阳区', id: 'chaoyangqu', children: [{ label: '百子湾', id: 'baiziwan' }] },
      { label: '海淀区', id: 'haidianqu' }
    ]
  }
]

const flattenedData = [
  { label: '北京', id: 'beijing' },
  { label: '朝阳区', id: 'chaoyangqu', pId: 'beijing' },
  { label: '百子湾', id: 'baiziwan', pId: 'chaoyangqu' },
  { label: '海淀区', id: 'haidianqu', pId: 'beijing' }
]


export default class TreeScreen extends Component<{}, any> {
  [propName: string]: any

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }

  render () {
    const treeDataA = new Tree({
      type: 'nested',
      ...fieldKeys,
      data: nestedData
    }).getData()

    const treeDataB = new Tree({
      type: 'flattened',
      ...fieldKeys,
      data: flattenedData
    }).getData()
    return (
      <ScrollView
        style={styles.body}>
        <Text style={styles.header}>嵌套结构处理</Text>
        <View
          style={[styles.panel, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }]}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 12 }}>{JSON.stringify(nestedData, null, 2)}</Text>
          </View>
          <View style={{ backgroundColor: '#cde', justifyContent: 'center' }}>
            <Text style={{ fontSize: 12 }}>-></Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 12 }}>{JSON.stringify(treeDataA, null, 2)}</Text>
          </View>
        </View>

        <Text style={styles.header}>扁平结构处理</Text>
        <View style={[styles.panel, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }]}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 12 }}>{JSON.stringify(flattenedData, null, 2)}</Text>
          </View>
          <View style={{ backgroundColor: '#cde', justifyContent: 'center' }}>
            <Text style={{ fontSize: 12 }}>-></Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 12 }}>{JSON.stringify(treeDataB, null, 2)}</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}
