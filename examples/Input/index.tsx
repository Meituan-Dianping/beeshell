import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Input, Form, Icon } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'

export default class InputScreen extends Component<any, any> {

  constructor (p) {
    super(p)
    this.state = {
    }
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
            <Input
              textAlign='right'
              value={this.state.address}
              placeholder='请输入地址'
              onChange={(value) => {
                this.setState({
                  address: value
                })
              }}
            />
          </Form.Item>
        </Form>

        <Text style={styles.header}>多行</Text>
        <Form>
          <Form.Item
            label='学校信息'>
            <View></View>
            <Input
              style={{ marginTop: 13 }}
              inputStyle={{ height: 80, textAlignVertical: 'top' }}
              textAlign='left'
              multiline
              value={this.state.school}
              placeholder='请输入学校信息'
              onChange={(value) => {
                this.setState({
                  school: value
                })
              }}
            />
          </Form.Item>
        </Form>
      </ScrollView>
    )
  }
}
