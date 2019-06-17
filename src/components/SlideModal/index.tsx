import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle
} from 'react-native'
import { Modal, ModalProps } from '../Modal'
import { SlideAnimated } from '../../common/animations'
import variables from '../../common/styles/variables'

export const slideModalStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: variables.mtdFillBackdrop
  },
  content: {
    position: 'absolute',
    overflow: 'hidden'
  }
})

export interface SlideModalProps extends ModalProps {
  styles?: { container?: StyleProp<ViewStyle>, backdrop?: StyleProp<ViewStyle>, content?: StyleProp<ViewStyle> }
  screenWidth?: number
  screenHeight?: number
  offsetX?: number | null | undefined
  offsetY?: number | null | undefined
  direction?: 'up' | ['up'] | ['up', 'left'] | ['up', 'right'] | 'down' | ['down'] |
      ['down', 'left'] | ['down', 'right'] | 'left' | ['left'] | 'right' | ['right']
  align?: 'left' | 'right' | 'up' | 'down'
  fullScreenPatch?: boolean[]
}

export class SlideModal<
  T extends SlideModalProps,
> extends Modal<T> {
  static defaultProps = {
    ...Modal.defaultProps,
    styles: {},
    cancelable: false,
    offsetX: 0,
    offsetY: undefined,
    direction: 'up',
    align: 'right',
    fullScreenPatch: [false, false, false]
  }

  constructor (props) {
    super(props)
  }

  // 重写 Modal 父类 init 方法
  init (props, syncTag?: boolean) {
    const directions = [
      ['up'],
      ['up', 'left'],
      ['up', 'right'],
      ['down'],
      ['down', 'left'],
      ['down', 'right'],
      ['left'],
      ['right']
    ]
    const direction = typeof(props.direction) === 'string' ? [props.direction] : props.direction
    const propsDirectionValid = directions.some((directionItem) => {
      const str1 = (directionItem as any).join()
      const str2 = (directionItem as any).reverse().join()
      const str3 = direction.join()

      if (str3 === str1 || str3 === str2) {
        return true
      }
    })

    if (!propsDirectionValid) {
      throw new TypeError(`direction 参数 ${props.direction} 为无效值`)
    }

    const directionType = []
    if (direction.indexOf('up') !== -1 || direction.indexOf('down') !== -1) {
      directionType.push('vertical')
    }

    if (direction.indexOf('left') !== -1 || direction.indexOf('right') !== -1) {
      directionType.push('horizontal')
    }

    let align: any
    if (direction.length === 1) {
      if (directionType.indexOf('vertical') !== -1) {
        align = props.align === 'left' || props.align === 'right' ? props.align : 'right'
      } else {
        align = props.align === 'up' || props.align === 'down' ? props.align : 'down'
      }
    }

    let directionWithAlign = []
    if (direction.length === 2) {
      directionWithAlign = direction
    } else {
      directionWithAlign = [
        ...direction,
        align
      ]
    }

    const offsetY = typeof props.offsetY === 'number' ? props.offsetY : props.screenHeight

    const data = {
      directionType,
      direction,
      align,
      directionWithAlign,
      offsetY
    }

    this.animated = new SlideAnimated({
      // duration: 1000
      directionType: data.directionType,
    })

    if (syncTag) {
      this.state = {
        ...this.state,
        ...data,
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
      nextProps.direction !== this.props.direction ||
      nextProps.align !== this.props.align ||
      nextProps.offsetX !== this.props.offsetX ||
      nextProps.offsetY !== this.props.offsetY ||
      nextProps.screenWidth !== this.props.screenWidth ||
      nextProps.screenHeight !== this.props.screenHeight
    ) {
      this.init(nextProps, false)
    }
  }

  open (c) {
    return Modal.prototype.open.call(this, c)
  }

  getRects () {
    const { offsetX, screenWidth, screenHeight } = this.props
    const { directionWithAlign, offsetY } = this.state
    const defaultRect = { top: null, bottom: null, left: null, right: null }
    const contentContainerRect = { ...defaultRect }
    const contentRect = { ...defaultRect }

    const contentClockwise2Rect = {
      backgroundColor: 'red',
      ...defaultRect
    }
    const contentClockwise1Rect = {
      backgroundColor: 'blue',
      ...defaultRect
    }
    const contentClockwise3Rect = {
      backgroundColor: 'green',
      ...defaultRect
    }

    if (directionWithAlign.indexOf('up') !== -1) {
      contentContainerRect.top = 0
      contentContainerRect.bottom = screenHeight - offsetY

      contentClockwise2Rect.top = offsetY
      contentClockwise2Rect.bottom = 0

      contentClockwise1Rect.left = offsetX
      contentClockwise1Rect.right = 0

      contentClockwise3Rect.left = 0
      contentClockwise3Rect.right = screenWidth - offsetX

      contentRect.bottom = 0
    }
    if (directionWithAlign.indexOf('down') !== -1) {
      contentContainerRect.top = offsetY
      contentContainerRect.bottom = 0

      contentClockwise2Rect.top = 0
      contentClockwise2Rect.bottom = screenHeight - offsetY

      contentClockwise1Rect.left = 0
      contentClockwise1Rect.right = screenWidth - offsetX

      contentClockwise3Rect.left = offsetX
      contentClockwise3Rect.right = 0

      contentRect.top = 0
    }

    if (directionWithAlign.indexOf('right') !== -1) {
      contentContainerRect.left = offsetX
      contentContainerRect.right = 0

      contentClockwise2Rect.left = 0
      contentClockwise2Rect.right = screenWidth - offsetX

      contentClockwise1Rect.top = offsetY
      contentClockwise1Rect.bottom = 0

      contentClockwise3Rect.top = 0
      contentClockwise3Rect.bottom = screenHeight - offsetY

      contentRect.left = 0
    }

    if (directionWithAlign.indexOf('left') !== -1) {
      contentContainerRect.left = 0
      contentContainerRect.right = screenWidth - offsetX

      contentClockwise2Rect.left = offsetX
      contentClockwise2Rect.right = 0

      contentClockwise1Rect.top = 0
      contentClockwise1Rect.bottom = screenHeight - offsetY

      contentClockwise3Rect.top = offsetY
      contentClockwise3Rect.bottom = 0

      contentRect.right = 0
    }

    return {
      contentContainerRect,
      contentRect,

      contentClockwise1Rect,
      contentClockwise2Rect,
      contentClockwise3Rect
    }
  }

  getFullScreenPatch() {
    const { cancelable, backdropColor, fullScreenPatch } = this.props
    if (fullScreenPatch.length !== 3) {
      throw new TypeError(`fullScreenPatch 参数 ${fullScreenPatch} 为无效值`)
    }
    const rects = this.getRects()
    const tmp = fullScreenPatch.map((patchItem, patchIndex) => {
      if (patchItem) {
        return `contentClockwise${patchIndex + 1}Rect`
      } else {
        return ''
      }
    }).filter((tmpItem) => {
      return tmpItem
    }).map((key) => {
      return {
        key,
        cancelable,
        closeFn: this.close.bind(this, this.modalState.topviewId),
        rect: {
          ...rects[key],
          backgroundColor: backdropColor,
        }
      }
    })

    return tmp
  }

  getContent (inner?): any {
    const { screenWidth, screenHeight } = this.props
    const tmp = inner == null ? this.props.children : inner
    const { contentContainerRect, contentRect } = this.getRects()
    const fullScreenPatch = this.getFullScreenPatch()

    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: screenWidth,
          height: screenHeight,
        }}
        collapsable={false}
        pointerEvents='box-none'>

        {
          fullScreenPatch.map((patchItem, patchIndex) => {
            return (
              <TouchableOpacity
                key={patchIndex}
                activeOpacity={1}
                style={{
                  position: 'absolute',
                  ...patchItem.rect
                }}
                onPress={() => {
                  if (patchItem.cancelable) {
                    patchItem.closeFn()
                  }
                }}>
              </TouchableOpacity>
            )
          })
        }

        <View
          collapsable={false}
          style={[
            slideModalStyles.container,
            {
              ...contentContainerRect
            },
            this.props.styles.container
          ]}>
          <TouchableOpacity
            testID='backdrop'
            style={[
              slideModalStyles.backdrop,
              {
                backgroundColor: this.props.backdropColor
              },
              this.props.styles.backdrop
            ]}
            activeOpacity={1}
            onPress={() => {
              this.handlePressBackdrop()
            }}
          />

          <Animated.View
            style={[
              slideModalStyles.content,
              {
                ...contentRect
              },
              {
                transform: [
                  { translateY: this.animated.getState().translateY },
                  { translateX: this.animated.getState().translateX }
                ],

                opacity: this.animated.getState().opacity
              },
              this.props.styles.content
            ]}
            onLayout={this.handleLayout}>
            {tmp || null}
          </Animated.View>
        </View>
      </View>
    )
  }

  handleLayout = (e: any) => {
    const { directionType, direction } = this.state
    const { width, height } = e.nativeEvent.layout
    const ret = []
    directionType.forEach((directionTypeItem: any) => {
      if (directionTypeItem === 'vertical') {
        ret.push({
          size: direction.indexOf('up') !== -1 ? height : -height,
          directionTypeItem,
        })
      }

      if (directionTypeItem === 'horizontal') {
        ret.push({
          size: direction.indexOf('right') !== -1 ? -width : width,
          directionTypeItem
        })
      }
    })
    this.animated.reset(ret)
  }
}
