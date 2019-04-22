import React, { ReactElement } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  PixelRatio,
  TextStyle,
  ViewStyle
} from 'react-native'
import { Modal, ModalProps } from '../Modal'
import dialogStyles from './styles'
import variables from '../../common/styles/variables'
const px = 1 / PixelRatio.get()

interface Operation {
  label?: ReactElement<any>
  labelText?: string
  labelTextStyle?: TextStyle
  type?: 'cancel' | 'confirm'
  onPress: Function
}

export interface DialogProps extends ModalProps {
  title?: string
  titleStyle?: TextStyle
  header?: any

  bodyText?: string
  bodyTextStyle?: TextStyle
  body?: any

  cancelLabel?: any
  cancelLabelText?: string
  cancelLabelTextStyle?: TextStyle
  cancelCallback?: Function

  confirmLabel?: any
  confirmLabelText?: string
  confirmLabelTextStyle?: TextStyle
  confirmCallback?: Function

  operationsLayout?: 'row' | 'column'
  operations?: Array<Operation>
}

export class Dialog extends Modal<DialogProps> {
  static defaultProps = {
    ...Modal.defaultProps,

    contentContainerStyle: {
      flex: 1,
      marginHorizontal: 40,
    },
    title: '标题',
    titleStyle: {},
    header: null,
    bodyText: '内容',
    bodyTextStyle: {},
    body: null,

    cancelable: true,

    cancelLabel: null,
    cancelLabelText: '取消',
    cancelLabelTextStyle: {},
    cancelCallback: null,

    confirmLabel: null,
    confirmLabelText: '确定',
    confirmLabelTextStyle: {},
    confirmCallback: null,

    operationsLayout: 'row',
    operations: null,
  }

  constructor (props) {
    super(props)
  }

  getContent () {
    const styles = dialogStyles

    const inner = (
      <View style={styles.container}>
        { this.getHeader() }
        {this.getBody()}
        {this.getFooter()}
      </View>
    )

    return Modal.prototype.getContent.call(this, inner)
  }

  getHeader () {
    const { header, title, titleStyle } = this.props

    if (header && React.isValidElement(header)) {
      return header
    }

    return (
      <View style={dialogStyles.header}>
        <Text style={[dialogStyles.title, titleStyle]}>{title}</Text>
      </View>
    )
  }

  getBody () {
    const { body, bodyText, bodyTextStyle } = this.props

    return React.isValidElement(body) ? body : (
      <View style={dialogStyles.body}>
        <Text style={[dialogStyles.bodyText, bodyTextStyle]}>{bodyText}</Text>
      </View>
    )
  }

  getFooter () {
    const styles = dialogStyles
    let {
      cancelLabel,
      cancelLabelText,
      cancelLabelTextStyle,
      cancelCallback,

      confirmLabel,
      confirmLabelText,
      confirmLabelTextStyle,
      confirmCallback,

      operationsLayout,
      operations,
    } = this.props

    operations = operations || []

    if (!operations.length) {
      if (cancelLabel || cancelLabelText || cancelCallback) {
        operations.push({
          label: cancelLabel,
          labelText: cancelLabelText,
          labelTextStyle: cancelLabelTextStyle,
          type: 'cancel',
          onPress: cancelCallback
        })
      }

      if (confirmLabel || confirmLabelText || confirmCallback) {
        operations.push({
          label: confirmLabel,
          labelText: confirmLabelText,
          labelTextStyle: confirmLabelTextStyle,
          type: 'confirm',
          onPress: confirmCallback
        })
      }
    }
    const length = operations.length

    if (!length) {
      return null
    }

    const operationEls = []
    operations.forEach((item, index) => {
      operationEls.push(
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            flex: operationsLayout === 'column' ? null : 1
          }}
          activeOpacity={variables.mtdOpacity}
          onPress={() => {
            item.onPress && item.onPress(item, index)
            this.close()
          }}>
          {
            React.isValidElement(item.label) ? item.label : (item.labelText ?
              <View
                style={[
                  item.type === 'cancel' ? styles.btnCancelWrapper : styles.btnConfirmWrapper
                ]}>
                <Text style={[item.type === 'cancel' ? styles.btnCancelText : styles.btnConfirmText, item.labelTextStyle]}>
                  {item.labelText}
                </Text>
              </View> : null
            )
          }
        </TouchableOpacity>
      )
      if (index < length - 1) {
        operationEls.push(
          <View
            key={index + 'x'}
            style={{ flexDirection: operationsLayout === 'column' ? 'row' : 'column' }}>
            <View
              style={{
                flex: 1,
                [operationsLayout === 'column' ? 'height' : 'width']: 1 * px,
                backgroundColor: variables.mtdBorderColor
              }}
            />
          </View>
        )
      }
    })

    return (
      <View style={[
        styles.footer,
        { flexDirection: operationsLayout }
      ]}>
        {operationEls}
      </View>
    )
  }

  render () {
    return null
  }
}
