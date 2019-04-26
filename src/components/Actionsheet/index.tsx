import React from 'react'

import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native'

import { SlideModal, SlideModalProps } from '../SlideModal'
import actionsheetStyles from './styles'

export { actionsheetStyles }

const screen = Dimensions.get('window')

interface DataItem {
  label: string
  [propName: string]: any
}

interface ActionsheetProps extends SlideModalProps {
  header?: any
  footer?: any
  data?: DataItem[] | any
  maxShowNum?: number | null | undefined
  renderItem?: Function
  onPressCancel?: Function
  onPressConfirm?: Function
  useSafeAreaView?: boolean
}

export class Actionsheet extends SlideModal<ActionsheetProps> {
  static defaultProps = {
    ...SlideModal.defaultProps,

    cancelable: true,
    maxShowNum: null,
    header: '标题',
    footer: '取消',

    useSafeAreaView: true,
    data: [],
    renderItem: null,
    onPressCancel: null,
    onPressConfirm: null
  }

  constructor (props) {
    super(props)
  }

  getHeader () {
    const styles = actionsheetStyles
    const { header } = this.props

    return React.isValidElement(header) ? header : (
      <View style={styles.header}>
        <Text style={styles.title}>{header}</Text>
      </View>
    )
  }

  getBody () {
    const { data, maxShowNum, renderItem } = this.props
    const styles = actionsheetStyles
    return (
      <ScrollView
        style={[
          styles.body,
          maxShowNum != null ? { maxHeight: 50 * maxShowNum + 30 } : {}
        ]}
        alwaysBounceVertical={maxShowNum != null}
      >
        {data.map((item, index) => {
          const tmpStyle = index === data.length - 1 ? { borderBottomWidth: 0 } : {}
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.handlePress('confirm', item, index)
              }}
            >
              {
                renderItem ?
                renderItem(item, index) :
                <View
                  style={[
                    styles.item,
                    tmpStyle
                  ]}>
                  <Text style={styles.itemText}>{ typeof item === 'object' ? item['label'] : item}</Text>
                </View>
              }
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }

  handlePress (type: string, item?, index?) {
    const callbackName = 'onPress' + type.slice(0, 1).toUpperCase() + type.slice(1)
    this.close().then(() => {
      this.props[callbackName] && this.props[callbackName](item, index)
    }).catch((e) => {
      console.log(e)
    })
  }

  getFooter () {
    const { footer } = this.props
    const styles = actionsheetStyles
    return (
      <TouchableOpacity
        style={{ marginTop: 4 }}
        onPress={() => {
          this.handlePress('cancel')
        }}>
        {
          footer && React.isValidElement(footer) ?
          footer :
          <View
            style={[
              styles.item,
              { borderBottomWidth: 0 }
            ]}>
            <Text style={styles.itemText}>{footer}</Text>
          </View>
        }
      </TouchableOpacity>
    )
  }

  getContent () {
    const styles = actionsheetStyles
    const inner = (
      <View style={[styles.container, { width: screen.width }]}>
        { this.getHeader() }
        { this.getBody() }
        { this.getFooter() }

        {
          this.props.useSafeAreaView ?
          <View
            style={{ maxHeight: 30 }}
            onLayout={(e) => {
              // const { height } = e.nativeEvent.layout
              // console.log('Actionsheet SafeAreaView height: ', height)
            }}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ height: 60 }}></View>
            </SafeAreaView>
          </View> : null
        }
      </View>
    )

    return SlideModal.prototype.getContent.call(this, inner)
  }
}
