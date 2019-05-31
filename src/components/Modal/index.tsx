import React from 'react'

import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
  ViewStyle
} from 'react-native'
import { TopviewGetInstance } from '../Topview'
import { FadeAnimated } from '../../common/animations'
import modalStyles from './styles'
import variables from '../../common/styles/variables'

export { modalStyles }

const screen = Dimensions.get('window')


export interface ModalProps {
  style?: ViewStyle | ViewStyle[]
  containerStyle?: ViewStyle | ViewStyle[]

  cancelable?: boolean
  scrollable?: boolean
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
> extends React.Component<T, any> {
  animated: any
  modalState: any

  static defaultProps = {
    cancelable: true,
    scrollable: false,
    backdropColor: variables.mtdFillBackdrop,

    screenWidth: screen.width,
    screenHeight: screen.height,

    offsetX: 0,
    offsetY: 0,

    animatedTranslateX: null,
    animatedTranslateY: null,

    containerStyle:  {},
    style: {},

    onOpen: null,
    onOpened: null,
    onClose: null,
    onClosed: null
  }

  constructor (props) {
    super(props)
    this.state = {
    }

    this.modalState = {
      topviewId: null,
      opening: false,
      closing: false
    }

    this.init(props, true)
  }

  init (props, syncTag?: boolean) {

    const tmpState = {
      containerStyle: props.containerStyle,
      style: props.style,
    }

    this.animated = new FadeAnimated({})

    if (syncTag) {
      this.state = {
        ...this.state,
        ...tmpState
      }
    } else {
      this.setState({
        ...this.state,
        ...tmpState
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.animatedTranslateX !== this.props.animatedTranslateX ||
      nextProps.animatedTranslateY !== this.props.animatedTranslateY ||
      nextProps.containerStyle !== this.props.containerStyle ||
      nextProps.style !== this.props.style
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
    if (this.modalState.topviewId && TopviewGetInstance()) {
      TopviewGetInstance().replace(this.getContent(), this.modalState.topviewId)
    }
  }

  handlePressBackdrop = () => {
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
    const { offsetY, offsetX, screenHeight, screenWidth, backdropColor } = this.props

    const contentWidth = screenWidth - offsetX
    const contentHeight = screenHeight - offsetY

    const innerView = (
      <TouchableOpacity
        style={[
          styles.container,
          this.state.containerStyle,
          {
            minHeight: contentHeight,
            minWidth: contentWidth,
            // backgroundColor: 'rgba(1, 2, 110, 0.5)',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        ]}
        activeOpacity={1}
        onPress={this.handlePressBackdrop}>

          <Animated.View
            style={[
              styles.content,
              {
                transform: [
                  { translateX: animatedState.translateX },
                  { translateY: animatedState.translateY }
                ],
                opacity: animatedState.opacity
              },
              this.state.style,
            ]}
            onLayout={this.handleLayout}>
            <Animated.View
              style={[
                {
                  transform: [{ scale: animatedState.scale }],
                },
              ]}>
              <TouchableOpacity
                activeOpacity={1}>
                {tmp || null}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
    )

    return (
      <View
        style={{
          position: 'absolute',
          top: offsetY,
          left: offsetX,
          width: contentWidth,
          height: contentHeight,
          flexDirection: 'column',
          backgroundColor: backdropColor
        }}>
        { this.renderInnerView(innerView) }
      </View>
    )
  }

  renderInnerView (innerView) {
    const style = { flex: 1 }
    if (this.props.scrollable) {
      return (
        <ScrollView style={style}>{innerView}</ScrollView>
      )
    } else {
      return (
        <View style={style}>{innerView}</View>
      )
    }
  }

  close () {
    if (this.modalState.closing || this.modalState.topviewId == null) {
      // '重复关闭'
      return Promise.resolve()
    }

    this.modalState.closing = true

    this.props.onClose &&
      this.props.onClose({
        ...this.modalState
      })

    return this.animated.toOut().then(() => {
      return TopviewGetInstance().remove(this.modalState.topviewId)
    }).then(() => {
      this.modalState.closing = false
      this.modalState.topviewId = null

      this.props.onClosed &&
        this.props.onClosed({
          ...this.modalState
        })
    }).catch((e) => {
      console.log(e)
    })
  }

  open (c?: any, args?: any) {
    if (!TopviewGetInstance()) {
      const msg = 'Topview instance is not existed.'
      console.log(msg)
      return Promise.reject(msg)
    }

    if (this.modalState.opening || this.modalState.topviewId) {
      // '不能重复打开'
      return Promise.resolve()
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
