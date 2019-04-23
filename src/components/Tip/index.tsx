import React from 'react'
import PropTypes from 'prop-types'

import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    PixelRatio,
} from 'react-native'
import { Modal, ModalProps } from '../Modal'
import tipStyles from './styles'
import varibles from '../../common/styles/variables'

const px = 1 / PixelRatio.get()

export interface TipProps extends ModalProps {
  body?: any
  duration?: number | null
}

export class Tip extends Modal<TipProps> {
  static defaultProps = {
    ...Modal.defaultProps,

    contentContainerStyle: {
      marginHorizontal: 40,
      marginVertical: 90,
    },
    cancelable: true,
    backdropColor: 'rgba(0, 0, 0, 0)',
    body: 'hello world',
    duration: null,
  }

  static tipInstance = null

  static show = function (msg: string, duration?: number, cancelable?: boolean, position?: string | string[]) {
    Tip.tipInstance = new Tip({
      ...Tip.defaultProps,

      contentContainerPosition: position || Tip.defaultProps.contentContainerPosition,
      body: msg,
      cancelable: typeof cancelable === 'boolean' ? cancelable : true,
      duration: Number(duration) || 2000,
    })

    Tip.tipInstance.open()
  }

  static hide = function () {
    Tip.tipInstance.close()
  }


  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  getContent(c) {
    const inner = <View style={tipStyles.container}>
      {this.getBody(c)}
    </View>
    return Modal.prototype.getContent.call(this, inner)
  }

  getBody(c) {
    const { body } = this.props
    let tmp = c == null ? body : c

    if (React.isValidElement(tmp)) {
      tmp = tmp
    } else {
      tmp = <Text style={tipStyles.info}>{String(tmp)}</Text>
    }

    return (
      <View style={tipStyles.body}>{tmp}</View>
    )

  }

  open(c) {
    return Modal.prototype.open.call(this, c).then((ret) => {
      if (typeof this.props.duration === 'number') {
        setTimeout(() => {
          this.close().catch((e) => {
            return null
          })
        }, this.props.duration)
      }

      return ret
    })
  }

  render() {
    return null
  }
}
