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
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>
        <Text style={styles.header}>左对齐</Text>
        <Form>
          <Form.Item
            style={{ paddingVertical: 13 }}
            label='姓名'
            hasLine>
            <Input value={this.state.name} placeholder='请输入姓名' onChange={(value) => {
              this.setState({
                name: value
              })
            }} />
          </Form.Item>

          <Form.Item
            style={{ paddingVertical: 13 }}
            label='住址'>
            <Input value={this.state.address} placeholder='请输入地址' onChange={(value) => {
              this.setState({
                address: value
              })
            }} />
          </Form.Item>
        </Form>

        <Text style={styles.header}>右对齐</Text>
        <Form>
          <Form.Item
            style={{ paddingVertical: 13 }}
            label='姓名'
            hasLine>
            <Input textAlign='right' value={this.state.name} placeholder='请输入姓名' onChange={(value) => {
              this.setState({
                name: value
              })
            }} />
          </Form.Item>

          <Form.Item
            style={{ paddingVertical: 13 }}
            label='住址'>
            <Input textAlign='right' value={this.state.address} placeholder='请输入地址' onChange={(value) => {
              this.setState({
                address: value
              })
            }} />
          </Form.Item>
        </Form>
      </ScrollView>
    )
  }
}
