import React, { Component, ReactElement } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle
} from 'react-native'
import { Icon } from '../Icon'
import navigationBarStyles from './styles'
import variables from '../../common/styles/variables'

export interface NavigationBarProps {
  testID?: string
  style?: ViewStyle
  proportion?: number[]

  titleContainer?: ReactElement<any>
  title?: string
  titleStyle?: TextStyle

  backLabel?: ReactElement<any>
  backLabelIcon?: ReactElement<any>
  backLabelText?: string
  backLabelTextStyle?: TextStyle
  onPressBack?: Function

  forwardLabel?: ReactElement<any>
  forwardLabelText?: string
  forwardLabelTextStyle?: TextStyle
  onPressForward?: Function

  renderItem?: Function
}

export class NavigationBar extends Component<NavigationBarProps, any> {
  static defaultProps = {
    style: {},
    proportion: [1, 2, 1],

    title: '标题',
    titleStyle: {},

    backLabelText: '返回',
    onPressBack: null,

    forwardLabelText: null,
    onPressForward: null,
    renderItem: null
  }

  constructor (props: NavigationBarProps) {
    super(props)
  }

  renderItem(index) {
    const {
      backLabel,
      backLabelIcon,
      backLabelText,
      backLabelTextStyle,
      onPressBack,
      titleContainer,
      title,
      titleStyle,
      forwardLabel,
      forwardLabelText,
      forwardLabelTextStyle,
      onPressForward
    } = this.props
    const fontSize = variables.mtdFontSizeL
    const fontColor = variables.mtdGrayBase

    if (index === 0) {
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
              {
                React.isValidElement(backLabelIcon) ? backLabelIcon :
                <Icon
                  source={require(`../../common/images/icons/angle-left.png`)}
                  size={fontSize}
                  tintColor={fontColor}>
                </Icon>
              }
              <Text
                style={[
                  {
                    fontSize,
                    color: fontColor
                  },
                  backLabelTextStyle
                ]}>
                {backLabelText}
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
          { React.isValidElement(titleContainer) ? titleContainer : <Text style={[{ textAlign: 'center', fontSize, color: fontColor }, titleStyle]}>{title}</Text>}
        </View>
      )
    }

    if (index === 2) {
      return (
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
              style={[
                {
                  fontSize,
                  color: fontColor
                },
                forwardLabelTextStyle
              ]}>
              {forwardLabelText}
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
