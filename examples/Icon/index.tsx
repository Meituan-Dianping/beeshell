import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Icon } from '../../src'

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  content: {
    alignItems: 'center',
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#ebebea',
    borderRadius: 2
  },
  title: {
    marginTop: 5,
    color: '#666'
  }
})

interface State {
  count: number
}

export default class IconScreen extends Component<{}, State> {
  constructor (p) {
    super(p)
    this.state = {
      count: 0
    }
  }

  render () {
    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column'
        }}>

        <View style={styles.panel}>
          <View style={styles.content}>
            <Icon type='caret-down' tintColor='#000' />
            <Text style={styles.title}>caret-down</Text>
          </View>

          <View style={styles.content}>
            <Icon type='caret-right' tintColor='#000' />
            <Text style={styles.title}>caret-right</Text>
          </View>

          <View style={styles.content}>
            <Icon type='caret-up' tintColor='#000' />
            <Text style={styles.title}>caret-up</Text>
          </View>
          <View style={styles.content}>
            <Icon type='check' tintColor='#000' />
            <Text style={styles.title}>check</Text>
          </View>

          <View style={styles.content}>
            <Icon type='check-circle' />
            <Text style={styles.title}>check-circle</Text>
          </View>

          <View style={styles.content}>
            <Icon type='circle-o' tintColor='#000' />
            <Text style={styles.title}>circle-o</Text>
          </View>

          <View style={styles.content}>
            <Icon type='plus-circle-o' tintColor='#000' />
            <Text style={styles.title}>plus-circle-o</Text>
          </View>

          <View style={styles.content}>
            <Icon type='question-circle' tintColor='#000' />
            <Text style={styles.title}>question-circle</Text>
          </View>

          <View style={styles.content}>
            <Icon type='chevron-left' tintColor='#000' />
            <Text style={styles.title}>chevron-left</Text>
          </View>

          <View style={styles.content}>
            <Icon type='times' tintColor='#000' />
            <Text style={styles.title}>times</Text>
          </View>

          <View style={styles.content}>
            <Icon type='times-circle' tintColor='#000' />
            <Text style={styles.title}>times-circle</Text>
          </View>

          <View style={styles.content}>
            <Icon type='times-circle-o' tintColor='#000' />
            <Text style={styles.title}>times-circle-o</Text>
          </View>

          <View style={styles.content}>
            <Icon type='minus' size={30} tintColor='#000' />
            <Text style={styles.title}>minus</Text>
          </View>

          <View style={styles.content}>
            <Icon type='map-marker' tintColor='#000' />
            <Text style={styles.title}>map-marker</Text>
          </View>

          <View style={styles.content}>
            <Icon type='star-o' tintColor='#000' />
            <Text style={styles.title}>star-o</Text>
          </View>

          <View style={styles.content}>
            <Icon type='star' tintColor='#000' />
            <Text style={styles.title}>star</Text>
          </View>

          <View style={styles.content}>
            <Icon type='search' tintColor='#000' />
            <Text style={styles.title}>search</Text>
          </View>

          <View style={styles.content}>
            <Icon type='share-square-o' tintColor='#000' />
            <Text style={styles.title}>share-square-o</Text>
          </View>

          <View style={styles.content}>
            <Icon type='ellipsis-h' tintColor='#000' />
            <Text style={styles.title}>ellipsis-h</Text>
          </View>

          <View style={styles.content}>
            <Icon
              size={50}
              source={{
                uri: 'http://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png'
              }}
              tintColor='#000'
            />
            <Text style={styles.title}>自定义 source</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}
