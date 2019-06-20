import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextStyle
} from 'react-native'
import {
  SlideModal,
  SlideModalProps
} from '../SlideModal'

import styleUtils from '../../common/styles/utils'
import bottomModalStyles from './styles'

const window = Dimensions.get('window')

export interface BottomModalProps extends SlideModalProps {
  testID?: string
  titleContainer?: any
  title?: string
  titleStyle?: TextStyle

  rightLabel?: any
  rightLabelText?: string
  rightLabelTextStyle?: TextStyle
  rightCallback?: Function

  leftLabel?: any
  leftLabelText?: string
  leftLabelTextStyle?: TextStyle
  leftCallback?: Function
}

export class BottomModal extends SlideModal<BottomModalProps> {
  static defaultProps = {
    ...SlideModal.defaultProps,

    cancelable: true,
    screenWidth: window.width,
    titleContainer: null,
    title: '标题',
    titleStyle: {},

    rightLabel: null,
    rightLabelText: '完成',
    rightLabelTextStyle: {},
    rightCallback: null,

    leftLabel: null,
    leftLabelText: '取消',
    leftLabelTextStyle: {},
    leftCallback: null,
  }

  constructor (props) {
    super(props)
  }

  getHeader () {
    const styles = bottomModalStyles
    const {
      titleContainer,
      title,
      titleStyle,
      rightLabel,
      rightLabelText,
      rightLabelTextStyle,
      rightCallback,

      leftLabel,
      leftLabelText,
      leftLabelTextStyle,
      leftCallback
    } = this.props

    let rightEl = null
    if (rightLabel || rightLabelText) {
      rightEl = (
        <TouchableOpacity
          testID='right'
          activeOpacity={1}
          onPress={() => {
            this.close().then(() => {
              rightCallback && rightCallback()
            })
          }}>
          {
            React.isValidElement(rightLabel) ? rightLabel :
            <Text
              style={[
                styles.operator,
                styleUtils.textRight,
                styleUtils.textPrimaryDark,
                styleUtils.textBold,
                rightLabelTextStyle
              ]}
              numberOfLines={1}>
              {rightLabelText}
            </Text>
          }
        </TouchableOpacity>
      )
    }

    let leftEl = null
    if (leftLabel || leftLabelText) {
      leftEl = (
        <TouchableOpacity
          testID='left'
          activeOpacity={1}
          onPress={() => {
            this.close().then(() => {
              leftCallback && leftCallback()
            })
          }}
        >
          {
            React.isValidElement(leftLabel) ? leftLabel :
            <Text style={[styles.operator, styleUtils.textLeft, leftLabelTextStyle]} numberOfLines={1}>
              {leftLabelText}
            </Text>
          }
        </TouchableOpacity>
      )
    }

    let titleContainerEl = null
    if (titleContainer || title) {
      titleContainerEl = React.isValidElement(titleContainer) ? titleContainer : (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )
    }

    return (
      <View style={styles.header}>
        <View style={styles.colSide}>{leftEl}</View>
        <View style={styles.colMiddle}>
          {titleContainerEl}
        </View>
        <View style={styles.colSide}>{rightEl}</View>
      </View>
    )
  }

  getBody () {
    return this.props.children
  }

  getContent () {
    const styles = bottomModalStyles
    const inner = (
      <View testID={this.props.testID} style={[styles.container, { width: this.props.screenWidth }, this.props.style]}>
        {this.getHeader()}

        {/* TouchableOpacity 没设置高度时 onPress 有问题*/}
        {this.getBody()}
      </View>
    )

    return SlideModal.prototype.getContent.call(this, inner)
  }
}
