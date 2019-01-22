import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Input, Form, Icon } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'

export default class InputScreen extends Component<{}, {}> {

  constructor (p) {
    super(p)
    this.state = {
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
      <ScrollView
        style={styles.body}>
        <Text style={styles.header}>左对齐</Text>
        <Form>
          <Form.Item
            label='姓名'
            hasLine>
            <Input value={this.state.name} placeholder='请输入姓名' onChange={(value) => {
              this.setState({
                name: value
              })
            }} />
          </Form.Item>

          <Form.Item
            label='住址'>
            <Input value={this.state.address} placeholder='请输入地址' onChange={(value) => {
              this.setState({
                address: value
              })
            }} />
          </Form.Item>
        </Form>

        <Text style={styles.header}>右对齐</Text>
      </ScrollView>
    )
  }
}
