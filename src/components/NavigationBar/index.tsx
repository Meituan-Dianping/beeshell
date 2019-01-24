import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native'
import { noop } from '../../common/utils/fns'
import { Icon } from '../Icon'
import navigationBarStyles from './styles'
import variables from '../../common/styles/variables'

export interface NavigationBarProps {
  style?: any
  title?: string
  proportion?: number[]
  backLabel?: string
  backCallback?: Function
  forwardLabel?: string
  forwardCallback: Function,
  renderItem: Function,
}

export class NavigationBar extends Component<NavigationBarProps, any> {
  static defaultProps = {
    style: {},
    proportion: [1, 2, 1],

    title: '标题',
    backLabel: '返回',
    backCallback: null,
    forwardLabel: null,
    forwardCallback: null
  }

  constructor (props: NavigationBarProps) {
    super(props)
  }

  renderItem(index) {
    const { backLabel, backCallback, title, forwardLabel, forwardCallback } = this.props
    const fontSize = variables.mtdFontSizeL
    const fontColor = variables.mtdGrayBase

    if (index === 0) {
      return backLabel == null ? null : (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: variables.mtdHSpacingXL
          }}
          onPress={() => {
            backCallback && backCallback()
          }}>
          <View
            style={{
              flexDirection: 'row',
              minWidth: 30
            }}>
            <Icon
              type='angle-left'
              size={fontSize}
              tintColor={fontColor}>
            </Icon>
            <Text
              style={{
                fontSize,
                color: fontColor
              }}>
              {backLabel}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }

    if (index === 1) {
      return (
        <Text style={{ textAlign: 'center', fontSize, color: fontColor }} >{title}</Text>
      )
    }

    if (index === 2) {
      return forwardLabel == null ? null : (
        <TouchableOpacity
          onPress={() => {
            forwardCallback && forwardCallback()
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingHorizontal: variables.mtdHSpacingXL
            }}>
            <Text
              style={{
                fontSize,
                color: fontColor
              }}>
              {forwardLabel}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const {
      renderItem,
      style,
      proportion
    } = this.props

    return (
      <View style={[navigationBarStyles.wrapper, style]}>
        {
          proportion.map((item, index) => {
            return (
              <View
                key={index}
                style={{ flex: item }}>
                { renderItem ? renderItem(item, index) : this.renderItem(index) }
              </View>
            )
          })
        }
      </View>
    )
  }
}
