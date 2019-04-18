import React, { Component, ReactNode, ReactChild } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Icon } from '../Icon'
import variables from '../../common/styles/variables'
import formStyles from './styles'

const styles = StyleSheet.create<any>(formStyles)

export interface FormItemProps {
  style?: any
  label?: string | ReactNode
  labelWidth?: number
  hasLine?: boolean
  children?: ReactChild[] | ReactChild
}

interface FormItemState {
}

export class FormItem extends Component<FormItemProps, FormItemState> {
  static defaultProps = {
    style: {},
    label: '标题',
    labelWidth: variables.formItemLabelWidth,
    hasLine: false
  }

  constructor (props) {
    super(props)

    this.state = {
      validation: '',
      valid: false,
      validating: false
    }
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  renderItem = () => {
    const children = this.props.children && Array.isArray(this.props.children) ?
      this.props.children : [this.props.children]

    return (
      <View>
        <View style={[styles.formItem, this.props.style]}>
          <View style={styles.container}>
            {
              React.isValidElement(this.props.label) ? this.props.label :
              <View style={[styles.label, { width: this.props.labelWidth }]}>
                <Text style={styles.labelText}>
                  {this.props.label}
                </Text>
              </View>
            }

            <View style={[styles.control]}>
              {children[0]}
            </View>
          </View>

          {
            [].slice.call(children, 1).length ? <View style={styles.others}>
              {[].slice.call(children, 1)}
            </View> : null
          }
        </View>
        {this.props.hasLine ? <View style={styles.line}></View> : null}
      </View>
    )
  }

  render () {
    return this.renderItem()
  }
}
