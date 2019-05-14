import React from 'react'

import {
    View,
    Text,
} from 'react-native'
import { Modal, ModalProps } from '../Modal'
import tipStyles from './styles'

export interface TipProps extends ModalProps {
  body?: any
  duration?: number | null
  position?: 'top' | 'left' | 'right' | 'bottom' | 'center' | ['top', 'left'] | ['top']
    | ['top', 'right'] | ['left'] | ['center'] | ['right'] | ['bottom', 'left'] | ['bottom'] | ['bottom', 'right']
}

export class Tip extends Modal<TipProps> {
  static defaultProps = {
    ...Modal.defaultProps,

    position: 'center',
    style: {
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

      position: position || Tip.defaultProps.position,
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

  init (props, syncTag?: boolean) {
    const positions = [
      ['top', 'left'],
      ['top'],
      ['top', 'right'],
      ['left'],
      ['center'],
      ['right'],
      ['bottom', 'left'],
      ['bottom'],
      ['bottom', 'right']
    ]

    const position = typeof(props.position) === 'string' ? [props.position] : props.position
    const propsPositionValid = positions.some((item) => {
      const str1 = (item as any).join()
      const str2 = (item as any).reverse().join()
      const str3 = position.join()
      if (str3 === str1 || str3 === str2) {
        return true
      }
    })

    if (!propsPositionValid) {
      throw new Error(`Tip 组件的 position 参数无效`)
    }

    const alignItems = position.indexOf('top') !== -1 ? 'flex-start' : (
      position.indexOf('bottom') !== -1 ? 'flex-end' : 'center'
    )
    const justifyContent = position.indexOf('left') !== -1 ? 'flex-start' : (
      position.indexOf('right') !== -1 ? 'flex-end' : 'center'
    )
    const tmpProps = {
      ...props,
      containerStyle: {
        alignItems,
        justifyContent
      }
    }
    Modal.prototype.init.call(this, tmpProps, syncTag)
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.position !== this.props.position
    ) {
      this.init(nextProps, false)
    } else {
      Modal.prototype.componentWillReceiveProps.call(this, nextProps)
    }
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

    if (!React.isValidElement(tmp)) {
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
