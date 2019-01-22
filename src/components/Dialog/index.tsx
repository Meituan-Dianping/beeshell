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
  label: string,
  type: 'cancel' | 'confirm',
  callback: Function
}

export interface DialogProps extends ModalProps {
  header?: any
  body?: any
  cancelCallback?: Function
  cancelLabel?: string
  confirmCallback?: Function
  confirmLabel?: string

  operationLayout?: 'row' | 'column'
  operationList?: Array<Operation>
  renderOperationItem?: Function
}

export class Dialog extends Modal<DialogProps, any> {
  static defaultProps = {
    ...Modal.defaultProps,

    flex: 1,
    marginHorizontal: 40,
    header: '标题',
    body: '内容',
    cancelable: true,
    cancelCallback: null,
    cancelLabel: '取消',
    confirmCallback: null,
    confirmLabel: '确认',

    operationLayout: 'row',
    operationList: null,
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
      operationLayout,
      operationList,
      renderOperationItem
    } = this.props

    operationList = operationList || []

    if (!operationList.length) {
      if (cancelCallback) {
        operationList.push({
          label: cancelLabel,
          type: 'cancel',
          callback: cancelCallback
        })
      }

      if (confirmCallback) {
        operationList.push({
          label: confirmLabel,
          type: 'confirm',
          callback: confirmCallback
        })
      }
    }
    const length = operationList.length

    if (!length) {
      return null
    }

    const operationEl = []
    operationList.forEach((item, index) => {
      operationEl.push(
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            flex: operationLayout === 'column' ? null : 1
          }}
          activeOpacity={0.3}
          onPress={() => {
            item.callback(item, index)
            this.close()
          }}>
          {
            renderOperationItem ? renderOperationItem(item, index) :
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
        operationEl.push(
          <View
            key={index + 'x'}
            style={{ flexDirection: operationLayout === 'column' ? 'row' : 'column' }}>
            <View
              style={{
                flex: 1,
                [operationLayout === 'column' ? 'height' : 'width']: 1 * px,
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
        { flexDirection: operationLayout }
      ]}>
        {operationEl}
      </View>
    )
  }

  render () {
    return null
  }
}
