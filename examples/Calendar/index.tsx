import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Calendar, Icon } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'


export default class CalendarScreen extends Component<{}, {}> {
  constructor (p) {
    super(p)
    this.state = {
      date: '2018-05-20',
    }
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>
        <Text style={styles.header}>基础</Text>
        <Calendar
          date={this.state.date}
          startDate={'2018-04-11'}
          endDate={'2018-06-22'}

          onChange={(date) => {
            this.setState({
              date
            })
          }}>
      </Calendar>
      </ScrollView>
    )
  }
}
