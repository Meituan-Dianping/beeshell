import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import {
  SlideModal,
  SlideModalProps,
  SlideModalState
} from '../SlideModal'

import styleUtils from '../../common/styles/utils'
import bottomModalStyles from './styles'

const screen = Dimensions.get('window')

export interface BottomModalProps extends SlideModalProps {
  title?: any
  leftCallback?: Function
  rightCallback?: Function
  rightLabel?: any
  leftLabel?: any
}

export interface BottomModalState extends SlideModalState {}

export class BottomModal extends SlideModal<BottomModalProps, BottomModalState> {
  static defaultProps = {
    ...SlideModal.defaultProps,
    width: screen.width,

    cancelable: true,
    title: '标题',
    leftCallback: null,
    rightCallback: null,
    leftLabel: '取消',
    rightLabel: '完成'
  }

  constructor (props) {
    super(props)
  }

  getHeader () {
    const styles = bottomModalStyles
    const { title, leftCallback, rightCallback, rightLabel, leftLabel } = this.props

    let confirmVel = rightLabel ? (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.close().then(() => {
            rightCallback && rightCallback()
          })
        }}
      >
        {
          React.isValidElement(rightLabel) ? rightLabel :
          <Text
            style={[
              styles.operator,
              styleUtils.textRight,
              styleUtils.textPrimaryDark
            ]}
            numberOfLines={1}>
            {rightLabel}
          </Text>
        }
      </TouchableOpacity>
    ) : null

    let cancelVel = leftLabel ? (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.close().then(() => {
            leftCallback && leftCallback()
          })
        }}
      >
        {
          React.isValidElement(leftLabel) ? leftLabel :
          <Text style={[styles.operator, styleUtils.textLeft]} numberOfLines={1}>
            {leftLabel}
          </Text>
        }
      </TouchableOpacity>
    ) : null

    return (
      <View style={styles.header}>
        <View style={styles.colSide}>{cancelVel}</View>
        <View style={styles.colMiddle}>
          {
            React.isValidElement(title) ? title :
            <Text style={styles.title}>{title}</Text>
          }
        </View>
        <View style={styles.colSide}>{confirmVel}</View>
      </View>
    )
  }

  getBody () {
    return this.props.children
  }

  getContent () {
    const styles = bottomModalStyles
    const inner = (
      <View style={[styles.container, { width: screen.width }]}>
        {this.getHeader()}

        {/* TouchableOpacity 没设置高度时 onPress 有问题*/}
        {this.getBody()}
      </View>
    )

    return SlideModal.prototype.getContent.call(this, inner)
  }
}
