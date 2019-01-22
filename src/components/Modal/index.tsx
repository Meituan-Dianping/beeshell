import React from 'react'

import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlexAlignType
} from 'react-native'
import { TopviewGetInstance } from '../Topview'
import { FadeAnimated } from '../../common/animations'
import modalStyles from './styles'

const screen = Dimensions.get('window')

export { modalStyles }

export interface ModalProps {
  cancelable: boolean
  backdropOpacity?: number

  animatedTranslateX?: number | null
  animatedTranslateY?: number | null

  alignItems?: FlexAlignType

  containerPositon?: 'top' | 'center' | 'bottom'
  containerStyle?: any

  onOpen?: any
  onOpened?: any
  onClose?: any
  onClosed?: any
}

export class Modal<
  T extends ModalProps,
  P
> extends React.Component<T, any> {
  animated: any
  modalState: any

  static defaultProps = {
    cancelable: true,
    backdropOpacity: 0.3,

    animatedTranslateX: null,
    animatedTranslateY: null,

    containerPositon: 'center',
    containerStyle:  {},

    onOpen: null,
    onOpened: null,
    onClose: null,
    onClosed: null
  }

  constructor (props) {
    super(props)

    this.modalState = {
      topviewId: null,
      opening: false,
      closing: false
    }

    this.init(props)
  }

  init (props) {
    const data = {
      screenHeight: screen.height,
      screenWidth: screen.width,
      animatedTranslateX: null,
      animatedTranslateY: null
    }

    data.animatedTranslateX =
      typeof props.animatedTranslateX === 'number'
        ? props.animatedTranslateX - data.screenWidth / 2
        : null
    data.animatedTranslateY =
      typeof props.animatedTranslateY === 'number'
        ? props.animatedTranslateY - data.screenHeight / 2
        : null

    if (!this.animated) {
      this.animated = new FadeAnimated()
    }
    this.animated.setState('translateXList', [data.animatedTranslateX, null])
    this.animated.setState('translateYList', [data.animatedTranslateY, null])
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.animatedTranslateY !== this.props.animatedTranslateY) {
      this.init(nextProps)
    }
  }

  componentWillUnmount () {
    this.close().catch(e => {
      return null
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.modalState.topviewId) {
      TopviewGetInstance().replace(this.getContent(), this.modalState.topviewId)
    }
  }

  handleBackdropPress () {
    if (this.props.cancelable) {
      this.close().catch(e => {
        return null
      })
    }
  }

  getContent (inner?) {
    const styles = modalStyles
    const tmp = inner == null ? this.props.children : inner
    const animatedState = this.animated ? this.animated.getState() : {}
    const containerPositon = this.props.containerPositon === 'top' ? 'flex-start' : (
      this.props.containerPositon === 'bottom' ? 'flex-end' : 'center'
    )

    return (
      <View
        style={[
          styles.container,
          {
            alignItems: containerPositon
          }
        ]}
      >
        <TouchableOpacity
          style={[styles.backdrop, { opacity: this.props.backdropOpacity }]}
          activeOpacity={this.props.backdropOpacity}
          onPress={this.handleBackdropPress.bind(this)}
        />

        <Animated.View
          style={[
            styles.content,
            this.props.containerStyle,

            {
              transform: [
                { translateX: animatedState.translateX },
                { translateY: animatedState.translateY }
              ],
              opacity: animatedState.opacity
            }
          ]}
        >
          <Animated.View
            style={[
              {
                transform: [{ scale: animatedState.scale }]
              }
            ]}
          >
            {tmp || null}
          </Animated.View>
        </Animated.View>
      </View>
    )
  }

  close () {
    if (this.modalState.closing || this.modalState.topviewId == null) {
      const msg = '不能重复关闭'
      // console.log(msg)
      return Promise.reject(msg)
    }

    this.modalState.closing = true

    this.props.onClose &&
      this.props.onClose({
        ...this.modalState
      })

    return this.animated
      .toOut()
      .then(() => {
        return TopviewGetInstance().remove(this.modalState.topviewId)
      })
      .then(() => {
        this.modalState.closing = false
        this.modalState.topviewId = null

        this.props.onClosed &&
          this.props.onClosed({
            ...this.modalState
          })
      })
  }

  open (c, forceFullScreen, cancelable, closeFn, containerReverseRect) {
    if (this.modalState.opening || this.modalState.topviewId) {
      const msg = '不能重复打开'
      // console.log(msg)
      return Promise.reject(msg)
    }

    if (!TopviewGetInstance()) {
      console.log('Topview instance is not existed.')
      return Promise.reject()
    }

    this.modalState.opening = true

    this.props.onOpen &&
      this.props.onOpen({
        ...this.modalState
      })

    return TopviewGetInstance()
      .add(this.getContent(c), forceFullScreen, cancelable, closeFn, containerReverseRect)
      .then(id => {
        this.modalState.topviewId = id

        return this.animated.toIn().then(() => {
          this.modalState.opening = false

          this.props.onOpened &&
            this.props.onOpened({
              ...this.modalState
            })
          return id
        })
      })
  }

  render () {
    return null
  }
}
