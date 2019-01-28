import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import { Progress, Button } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'

export default class ProgressScreen extends Component<{}, any> {

  constructor (props) {
    super(props)
    this.state = {
      percentA: 30,
      percent: 40
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        percentA: 90
      })
    }, 2000)
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
      <ScrollView style={styles.body}>
        <Text style={styles.header}>基础</Text>
        <View style={styles.panel}>
          <Text style={{ fontSize: 14, color: variables.mtdGrayBase, marginBottom: 4 }}>{this.state.percentA}%</Text>
          <Progress
            easing={true}
            percent={this.state.percentA}
          />
        </View>

        <Text style={styles.header}>自定义样式、无动画</Text>
        <View style={styles.panel}>
          <Text style={{ fontSize: 14, color: variables.mtdGrayBase, marginBottom: 4 }}>{this.state.percentA}%</Text>
          <Progress
            style={{ backgroundColor: variables.mtdGray }}
            barStyle={{ height: 4, backgroundColor: variables.mtdBrandDanger }}
            easing={false}
            percent={this.state.percentA}
          />
        </View>


        <Text style={styles.header}>其他</Text>
        <View style={styles.panel}>
          <Text style={{ fontSize: 14, color: variables.mtdGrayBase, marginBottom: 4 }}>{this.state.percent}%</Text>
          <Progress
            easing={true}
            percent={this.state.percent}
          />

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button size='sm' onPress={this.onAdd}>点击</Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}
