import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Switch } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'

export default class SwitchScreen extends Component<{}, any> {
  constructor (p) {
    super(p)
    this.state = {
    }
  }

  onChange = (val) => {
    console.log(val)
  }

  render () {
    return (
      <ScrollView>
        <View>
          <Text style={styles.title}>基础开关</Text>
          <View style={styles.line}>
            <Text>
              关闭
            </Text>
            <Switch onChange={this.onChange}/>
          </View>
          <View style={styles.line}>
            <Text>
              开启
            </Text>
            <Switch value={true} onChange={this.onChange}/>
          </View>
          <View style={styles.line}>
            <Text>
              禁用
            </Text>
            <Switch disabled={true} onChange={this.onChange}/>
          </View>
        </View>
        <View>
          <Text style={styles.title}>衍生开关</Text>
          <View style={styles.line}>
            <Text>
              正常
            </Text>
            <Switch onChange={this.onChange} rockerSize={20}/>
          </View>
          <View style={styles.line}>
            <Text>
              打开
            </Text>
            <Switch value={true} onChange={this.onChange} rockerSize={20}/>
          </View>
          <View style={styles.line}>
            <Text>
              禁用
            </Text>
            <Switch disabled={true} onChange={this.onChange} rockerSize={20}/>
          </View>
        </View>
      </ScrollView>
    )
  }
}
