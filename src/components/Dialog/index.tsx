import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  PixelRatio
} from 'react-native'
import { Modal, ModalProps } from '../Modal'
import dialogStyles from './styles'
import variables from '../../common/styles/variables'
const px = 1 / PixelRatio.get()

interface Operation {
  label: any
  type?: 'cancel' | 'confirm'
  onPress: Function
}

export interface DialogProps extends ModalProps {
  header?: any
  body?: any
  cancelCallback?: Function
  cancelLabel?: string
  confirmCallback?: Function
  confirmLabel?: string

  operationsLayout?: 'row' | 'column'
  operations?: Array<Operation>
}

export class Dialog extends Modal<DialogProps, any> {
  static defaultProps = {
    ...Modal.defaultProps,

    contentContainerStyle: {
      flex: 1,
      marginHorizontal: 40,
    },

    header: '标题',
    body: '内容',
    cancelable: true,
    cancelCallback: null,
    cancelLabel: '取消',
    confirmCallback: null,
    confirmLabel: '确认',

    operationsLayout: 'row',
    operations: null,
    renderOperationItem: null
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
    const styles = dialogStyles
    const { header } = this.props

    if (header == null) {
      return null
    }

    if (React.isValidElement(header)) {
      return header
    }

    return (
      <View style={styles.header}>
        <Text style={styles.title}>{header}</Text>
      </View>
    )
  }

  getBody () {
    const styles = dialogStyles
    const { body } = this.props

    return React.isValidElement(body) ? body : (
      <View style={styles.body}>
        <Text style={styles.bodyText}>{String(body)}</Text>
      </View>
    )
  }

  getFooter () {
    const styles = dialogStyles
    let {
      cancelCallback,
      cancelLabel,
      confirmCallback,
      confirmLabel,
      operationsLayout,
      operations,
    } = this.props

    operations = operations || []

    if (!operations.length) {
      if (cancelLabel || cancelCallback) {
        operations.push({
          label: cancelLabel,
          type: 'cancel',
          onPress: cancelCallback
        })
      }

      if (confirmLabel || confirmCallback) {
        operations.push({
          label: confirmLabel,
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
            React.isValidElement(item.label) ? item.label :
            <View
              style={[
                item.type === 'cancel' ? styles.btnCancelWrapper : styles.btnConfirmWrapper
              ]}>
              <Text style={item.type === 'cancel' ? styles.btnCancelText : styles.btnConfirmText}>
                {item.label}
              </Text>
            </View>
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
