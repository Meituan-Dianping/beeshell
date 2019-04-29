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
  testID?: string
  style?: ViewStyle
  proportion?: number[]
  title?: any
  backLabel?: any
  onPressBack?: Function
  forwardLabel?: any
  onPressForward?: Function
  renderItem?: Function
}

export class NavigationBar extends Component<NavigationBarProps, any> {
  static defaultProps = {
    style: {},
    proportion: [1, 2, 1],

    title: '标题',
    backLabel: '返回',
    onPressBack: null,
    forwardLabel: null,
    onPressForward: null,
    renderItem: null
  }

  constructor (props: NavigationBarProps) {
    super(props)
  }

  renderItem(index) {
    const { backLabel, onPressBack, title, forwardLabel, onPressForward } = this.props
    const fontSize = variables.mtdFontSizeL
    const fontColor = variables.mtdGrayBase

    if (index === 0) {
      if (backLabel == null) {
        return null
      }
      return (
        <TouchableOpacity
          testID='back'
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: variables.mtdVSpacingXL,
            paddingHorizontal: variables.mtdHSpacingXL
          }}
          onPress={() => {
            onPressBack && onPressBack()
          }}>

          {
            React.isValidElement(backLabel) ? backLabel :
            <View
              style={{
                flexDirection: 'row',
                minWidth: 30,
                alignItems: 'center'
              }}>
              <Icon
                source={require(`../../common/images/icons/angle-left.png`)}
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
          }
        </TouchableOpacity>
      )
    }

    if (index === 1) {
      return (
        <View
          style={{
            paddingVertical: variables.mtdVSpacingXL,
            paddingHorizontal: variables.mtdHSpacingXL
          }}>
          { React.isValidElement(title) ? title : <Text style={{ textAlign: 'center', fontSize, color: fontColor }} >{title}</Text>}
        </View>
      )
    }

    if (index === 2) {
      return forwardLabel == null ? null : (
        <TouchableOpacity
          testID='forward'
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingVertical: variables.mtdVSpacingXL,
            paddingHorizontal: variables.mtdHSpacingXL
          }}
          onPress={() => {
            onPressForward && onPressForward()
          }}>
          {
            React.isValidElement(forwardLabel) ? forwardLabel :
            <Text
              style={{
                fontSize,
                color: fontColor
              }}>
              {forwardLabel}
            </Text>
          }
        </TouchableOpacity>
      )
    }
  }

  render() {
    const {
      testID,
      style,
      proportion,
      renderItem
    } = this.props

    return (
      <View testID={testID} style={[navigationBarStyles.wrapper, style]}>
        {
          proportion.map((item, index) => {
            return (
              <View
                key={index}
                style={{ flex: item }}>
                {renderItem ? renderItem(index) : this.renderItem(index)}
              </View>
            )
          })
        }
      </View>
    )
  }
}
