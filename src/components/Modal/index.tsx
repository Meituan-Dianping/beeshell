import React from 'react'

import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native'
import { TopviewGetInstance } from '../Topview'
import { FadeAnimated } from '../../common/animations'
import modalStyles from './styles'

const screen = Dimensions.get('window')

export { modalStyles }

export interface ModalProps {
  contentContainerStyle?: any
  contentContainerPosition?: 'top' | 'left' | 'right' | 'bottom' | 'center' | ['top', 'left'] | ['top']
    | ['top', 'right'] | ['left'] | ['center'] | ['right'] | ['bottom', 'left'] | ['bottom'] | ['bottom', 'right']

  cancelable: boolean
  backdropOpacity?: number
  backdropColor?: string

  screenWidth?: number
  screenHeight?: number

  offsetX?: number
  offsetY?: number

  animatedTranslateX?: number | null
  animatedTranslateY?: number | null

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
    backdropColor: StyleSheet.flatten(modalStyles.backdrop).backgroundColor,

    screenWidth: screen.width,
    screenHeight: screen.height,

    offsetX: 0,
    offsetY: 0,

    animatedTranslateX: null,
    animatedTranslateY: null,

    contentContainerPosition: 'center',
    contentContainerStyle:  {},

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

    this.init(props, true)
  }

  init (props, syncTag?: boolean) {
    const contentContainerPositions = [
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

    const contentContainerPosition = typeof(props.contentContainerPosition) === 'string' ? [props.contentContainerPosition] : props.contentContainerPosition
    const propsContentContainerPositionValid = contentContainerPositions.some((item) => {
      const str1 = (item as any).join()
      const str2 = (item as any).reverse().join()
      const str3 = contentContainerPosition.join()
      if (str3 === str1 || str3 === str2) {
        return true
      }
    })

    if (!propsContentContainerPositionValid) {
      throw new TypeError(`contentContainerPosition 参数 ${props.contentContainerPosition} 为无效值`)
    }

    const data = {
      contentContainerPosition
    }

    this.animated = new FadeAnimated({})

    if (syncTag) {
      this.state = {
        ...this.state,
        ...data
      }
    } else {
      this.setState({
        ...this.state,
        ...data
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.animatedTranslateY !== this.props.animatedTranslateY ||
      nextProps.contentContainerPosition !== this.props.contentContainerPosition
    ) {
      this.init(nextProps, false)
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

  handleLayout = (e: any) => {
    const { x, y, width, height } = e.nativeEvent.layout
    const { animatedTranslateX, animatedTranslateY } = this.props
    let translateX = null
    let translateY = null
    const ret = []
    if (animatedTranslateX != null) {
      translateX = animatedTranslateX - (width / 2) - x
      ret.push({
        key: 'translateX',
        value: translateX
      })
    }

    if (animatedTranslateY != null) {
      translateY = animatedTranslateY - (height / 2) - y
      ret.push({
        key: 'translateY',
        value: translateY
      })
    }
    this.animated.reset(ret)
  }

  getContent (inner?) {
    const styles = modalStyles
    const tmp = inner == null ? this.props.children : inner
    const animatedState = this.animated ? this.animated.getState() : {}
    const { offsetY, offsetX } = this.props
    const { contentContainerPosition } = this.state

    const alignItems = contentContainerPosition.indexOf('top') !== -1 ? 'flex-start' : (
      contentContainerPosition.indexOf('bottom') !== -1 ? 'flex-end' : 'center'
    )
    const justifyContent = contentContainerPosition.indexOf('left') !== -1 ? 'flex-start' : (
      contentContainerPosition.indexOf('right') !== -1 ? 'flex-end' : 'center'
    )

    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        collapsable={false}
        pointerEvents={'box-none'}>
        <View
          style={[
            styles.container,
            {
              top: offsetY,
              left: offsetX,
            },
            {
              justifyContent,
              alignItems
            }
          ]}
        >
          <TouchableOpacity
            style={[
              styles.backdrop,
              {
                opacity: this.props.backdropOpacity,
                backgroundColor: this.props.backdropColor
              }
            ]}
            activeOpacity={this.props.backdropOpacity}
            onPress={this.handleBackdropPress.bind(this)}
          />

          <Animated.View
            style={[
              styles.content,
              this.props.contentContainerStyle,

              {
                transform: [
                  { translateX: animatedState.translateX },
                  { translateY: animatedState.translateY }
                ],
                opacity: animatedState.opacity
              }
            ]}
            onLayout={this.handleLayout}>
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

  open (c?: any, args?: any) {
    if (this.modalState.opening || this.modalState.topviewId) {
      const msg = '不能重复打开'
      // console.log(msg)s
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
      .add(this.getContent(c), args)
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
