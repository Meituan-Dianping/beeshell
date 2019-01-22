import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native'
import { Modal, ModalProps, modalStyles } from '../Modal'
import { SlideAnimated } from '../../common/animations'

const screen = Dimensions.get('window')

export const slideModalStyles = StyleSheet.create({
  container: {
    ...StyleSheet.flatten(modalStyles.container)
  },
  content: {
    position: 'absolute',
    overflow: 'hidden'
  }
})

export interface SlideModalProps extends ModalProps {
  offsetX?: number | null | undefined
  offsetY?: number | null | undefined
  direction?: 'up' | 'down' | 'left' | 'right'
  forceFullScreen?: boolean
}

export interface SlideModalState {
  directionType: 'vertical' | 'horizontal'
}

export class SlideModal<
  T extends SlideModalProps,
  P extends SlideModalState
> extends Modal<T, P> {
  static defaultProps = {
    ...Modal.defaultProps,
    cancelable: false,
    opacity: 0.3,
    offsetX: 0,
    offsetY: screen.height,
    direction: 'up',
    forceFullScreen: false // 是否强制全屏
  }

  constructor (props) {
    super(props)
    const data = this.initSlideModalData(props)

    this.state = {
      ...this.state,
      ...data
    }
  }

  // 覆盖 Modal init 方法
  init (props) {
    // return
  }

  initSlideModalData (props): any {
    const directions = ['up', 'down', 'left', 'right']

    if (directions.indexOf(props.direction) === -1) {
      throw new TypeError(`direction 参数 ${props.direction} 为无效值`)
    }

    let directionType
    if (props.direction === 'up' || props.direction === 'down') {
      directionType = 'vertical'
    }

    if (props.direction === 'left' || props.direction === 'right') {
      directionType = 'horizontal'
    }

    const data = {
      directionType
    }

    this.animated = new SlideAnimated({
      // duration: 1000
      directionType: data.directionType
    })
    return data
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.direction !== this.props.direction
    ) {
      this.setState({
        ...this.initSlideModalData(nextProps)
      })
    }
  }

  open (c) {
    let containerReverseRect = null
    if (this.props.forceFullScreen) {
      const { direction, offsetX, offsetY, opacity } = this.props
      const { directionType } = this.state

      containerReverseRect = {
        top: directionType === 'vertical' ? (
            direction === 'up' ? offsetY : 0
        ) : 0,

        height: directionType === 'vertical' ? (
            direction === 'up' ? screen.height - offsetY : offsetY
        ) : screen.height,

        left: directionType === 'horizontal' ? (
            direction === 'right' ? 0 : offsetX
        ) : 0,

        width: directionType === 'horizontal' ? (
            direction === 'right' ? offsetX : screen.width - offsetX
        ) : screen.width,

        backgroundColor: StyleSheet.flatten(modalStyles.mask).backgroundColor,
        opacity
      }
    }

    return Modal.prototype.open.call(this, c, this.props.forceFullScreen, this.props.cancelable, this.close.bind(this, this.modalState.topviewId), containerReverseRect)
  }

  getContent (inner) {
    const styles = slideModalStyles
    const { direction, offsetY, offsetX } = this.props
    const { directionType } = this.state
    const tmp = inner == null ? this.props.children : inner

    const containerRect = {
      top: directionType === 'vertical' ? (
          direction === 'up' ? 0 : offsetY
      ) : 0,
      height: directionType === 'vertical' ? (
          direction === 'up' ? offsetY : screen.height - offsetY
      ) : null,

      left: directionType === 'horizontal' ? (
          direction === 'right' ? offsetX : 0
      ) : 0,

      width: directionType === 'horizontal' ? (
          direction === 'right' ? null : offsetX
      ) : null
    }

    return (
      <View
        collapsable={false}
        style={[
          styles.container,
          {
            ...containerRect
          }
        ]}
      >
        <TouchableOpacity
          style={[modalStyles.mask, { opacity: this.props.opacity }]}
          activeOpacity={this.props.opacity}
          onPress={() => {
            this.handleMaskPress()
          }}
        />

        <Animated.View
          style={[
            styles.content,
            {
              left:
                directionType === 'vertical'
                  ? offsetX
                  : direction === 'right'
                  ? 0
                  : null,

              right:
                directionType === 'vertical'
                  ? null
                  : direction === 'right'
                  ? null
                  : 0,

              top:
                directionType === 'vertical'
                  ? direction === 'up'
                    ? null
                    : 0
                  : offsetY,

              bottom:
                directionType === 'vertical'
                  ? direction === 'up'
                    ? 0
                    : null
                  : null
            },

            {
              transform: [
                { translateY: this.animated.getState().translateY },
                { translateX: this.animated.getState().translateX }
              ],

              opacity: this.animated.getState().opacity
            }
          ]}
          onLayout={e => {
            const { width, height } = e.nativeEvent.layout

            if (directionType === 'vertical') {
              this.animated.reset(
                direction === 'up' ? height : -height,
                directionType
              )
            }

            if (directionType === 'horizontal') {
              this.animated.reset(
                direction === 'left' ? width : -width,
                directionType
              )
            }
          }}
        >
          {tmp || null}
        </Animated.View>
      </View>
    )
  }
}
