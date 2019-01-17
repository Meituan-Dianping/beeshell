import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Input } from '../../src'

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 2
  },
  cell: {
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#dddddd',
    borderBottomWidth: 1,
    minHeight: 40
  }
})

interface State {
  defaultValue: string
  dynamicValue: string
  userInputValue: string
}

export default class InputScreen extends Component<{}, State> {

  constructor (p) {
    super(p)
    this.state = {
      defaultValue: 'I am Bob.yao',
      dynamicValue: 'Now I am lili.',
      userInputValue: ''
    }
  }

  handleDebounce = (val) => {
    this.setState({
      userInputValue: val
    })
  }

  handleChange = (val) => {
    this.setState({
      userInputValue: val
    })
  }

  handFocus = (e) => {
    this.setState({
      userInputValue: `${e.target} focused`
    })
  }

  handBlur = (e) => {
    this.setState({
      userInputValue: `${e.target} blured`
    })
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        dynamicValue: 'Then I am wang'
      })
    }, 2000)
  }

  render () {
    return (
      <ScrollView>
        <Text>
          绑定focus
        </Text>
        <View style={styles.card}>
          <View style={styles.cell}>
            <Input value={'who am I'} onChange={this.handleChange} onFocus={this.handFocus}/>
          </View>
        </View>
        <Text>
          绑定blur ,右对齐, 最大10个字符, 小数键盘
        </Text>
        <View style={styles.card}>
          <View style={styles.cell}>
            <Input placeholder={'who am you?'} keyboardType={'decimal-pad'} textAlign={'right'} maxLength={10} />
          </View>
        </View>
        <Text>
          3S后 动态设置：
        </Text>
        <View style={styles.card}>
          <View style={styles.cell}>
            <Input value={this.state.dynamicValue} onChange={this.handleChange}/>
          </View>
        </View>
        <Text>
          Debounce 1000ms: 1000ms触发onChange
        </Text>
        <View style={styles.card}>
          <View style={styles.cell}>
            <Input debounce={1000} debounceCallback={this.handleDebounce}/>
          </View>
        </View>
        <Text>
          输入结果显示
        </Text>
        <View style={styles.card}>
          <View style={styles.cell}>
            <Text>{this.state.userInputValue}</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}
