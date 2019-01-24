import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Switch, Form } from '../../src'
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
      <ScrollView
        style={styles.body}>
        <Form>
          <Form.Item label='基础' hasLine>
            <View style={{ alignItems: 'flex-end' }}>
              <Switch value={true} onChange={this.onChange}/>
            </View>
          </Form.Item>

          <Form.Item label='禁用' hasLine>
            <View style={{ alignItems: 'flex-end' }}>
              <Switch disabled onChange={this.onChange}/>
            </View>
          </Form.Item>

          <Form.Item label='自定义'>
            <View style={{ alignItems: 'flex-end' }}>
              <Switch onChange={this.onChange} rockerSize={20}/>
            </View>
          </Form.Item>
        </Form>
      </ScrollView>
    )
  }
}
