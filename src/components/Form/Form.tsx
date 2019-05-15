import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ViewStyle
} from 'react-native'

import formStyles from './styles'
import { FormItem } from './FormItem'
const styles = StyleSheet.create<any>(formStyles)

export interface FormProps {
  testID?: string
  style?: ViewStyle
}

interface FormState {
}

export class Form extends Component<FormProps, FormState> {
  static displayName = 'Form'
  static defaultProps = {
    style: {}
  }
  static Item = FormItem

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View testID={this.props.testID} style={[styles.form, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}
