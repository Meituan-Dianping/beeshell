import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import { Progress } from '../../src'

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  title: {
    color: '#202325',
    fontSize: 24,
    lineHeight: 33
  },
  subtitle: {
    lineHeight: 28,
    fontSize: 20,
    color: '#202020',
    paddingHorizontal: 15
  },
  label: {
    lineHeight: 25,
    fontSize: 18,
    color: '#202020',
    paddingHorizontal: 15,
    marginTop: 30,
    marginBottom: 10
  },
  description: {
    color: '#666666',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 17
  }
})

export default class ProgressScreen extends Component<{}, any> {

  constructor (props) {
    super(props)
    this.state = {
      percent: 40
    }
  }

  onAdd = () => {
    let p = this.state.percent + 10

    if (this.state.percent >= 100) {
      p = 0
    }
    this.setState({
      percent: p
    })
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>进度条 Progress</Text>
          <Text style={styles.description}>向用户传达特定进程的进度，告知用户当前状态和预期。</Text>
        </View>
        <Text style={styles.subtitle}>基础</Text>
        <View style={{ height: 10 }}></View>
        <View style={{ backgroundColor: '#ffffff', paddingTop: 23, paddingBottom: 29 }}>
          <Text style={{ fontSize: 12, lineHeight: 17, color: '#333333', paddingLeft: 15, marginBottom: 4 }}>90%</Text>
          <View style={{ paddingBottom: 23 }}>
            <Progress
              easing={true}
              percent={90}
              barStyle={{ borderBottomWidth: 3 }}
            />
          </View>
          <Text style={{ fontSize: 12, lineHeight: 17, color: '#333333', paddingLeft: 15, marginBottom: 4 }}>40%</Text>
          <View>
          <Progress
              easing={true}
              percent={40}
              barStyle={{ borderBottomWidth: 3 }}
            />
          </View>
        </View>
        <View style={{ height: 30 }}></View>
        <Text style={styles.subtitle}>点击进度</Text>
        <View style={{ height: 10 }}></View>
        <View style={{ backgroundColor: '#ffffff', paddingTop: 23, paddingBottom: 29 }}>
          <TouchableHighlight
            onPress={this.onAdd}
            underlayColor='transparent'
          >
            <Text style={{ fontSize: 12, lineHeight: 17, color: '#333333', paddingLeft: 15, marginBottom: 4 }}>点击</Text>
          </TouchableHighlight>
          <View>
            <Progress
              easing={true}
              percent={this.state.percent}
              barStyle={{ borderBottomWidth: 3 }}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}
