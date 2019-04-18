import React from 'react'
import { View, Text, ScrollView, PixelRatio, ViewStyle } from 'react-native'
import variables from '../../common/styles/variables'
import { range } from '../../common/utils'
import scrollpickerStyles from './styles'

export { scrollpickerStyles }

const px = 1 / PixelRatio.get()
const DEFAULT_CONTAINER_HEIGHT = 1

interface ListItem {
  label: string | number
  [propName: string]: any
}

export interface ScrollpickerProps {
  style?: ViewStyle
  list?: Array<Array<ListItem>> | any
  value?: number[]
  proportion?: number[]
  offsetCount?: number
  onChange?: Function
  renderItem?: Function
}

interface ScrollpickerState {
  list: Array<Array<ListItem>>
  value: number[]
  proportion: number[]
  targetItemHeight: number
  containerHeight: number
}

export class Scrollpicker extends React.Component<ScrollpickerProps, ScrollpickerState> {
  containerRef = null
  scrollers = []
  targetItemHeight = null
  containerHeight = null

  static defaultProps = {
    style: {},
    list: [
      ['第一列第一项', '第一列第二项', '第一列第三项'],
      ['第二列第一项', '第二列第二项', '第二列第三项'],
      ['第三列第一项', '第三列第二项', '第三列第三项']
    ],
    value: [],
    proportion: [2, 1, 1],
    offsetCount: 2,
    onChange: null,
    renderItem: null
  }

  constructor (props) {
    super(props)
    this.containerRef = null

    const data = this.initialize(props)

    this.state = {
      ...data,

      targetItemHeight: null,
      containerHeight: null
    }

    this.scrollers = []
  }

  initialize (props) {
    const data = this.initData(props)

    return data
  }

  initData (props) {
    let { list, proportion, value } = props

    if (!list || !list.length) {
      throw TypeError('提供有效的 list 参数')
    }

    const { offsetCount } = this.props

    const placeholderList = range(offsetCount).map(() => {
      return ''
    })

    list = list.map(scrollItem => {
      const tmp = scrollItem.concat()

      ;[].push.apply(tmp, placeholderList)
      ;[].unshift.apply(tmp, placeholderList)

      return tmp
    })

    const length = list.length

    if (
      !proportion ||
      !proportion.length ||
      (proportion && proportion.length && proportion.length !== length)
    ) {
      proportion = range(length).map(() => {
        return 1
      })
    }

    if (
      !value ||
      !value.length ||
      (value && value.length && value.length !== length)
    ) {
      value = range(length).map(() => {
        return 0
      })
    }

    return {
      list,
      value,
      proportion
    }
  }

  componentDidMount () {
    this.getUIData(this.containerRef, DEFAULT_CONTAINER_HEIGHT).then((data: any) => {
      const { targetItemHeight } = data
      const containerHeight = this.resizeContainerHeight(targetItemHeight)

      this.setState(
        {
          containerHeight,
          targetItemHeight
        },
        () => {
          this.getUIData(this.containerRef, this.state.containerHeight).then((uiData) => {
            const { value } = this.state

            value.forEach((item, index) => {
              this.scrollTo(index, item, false)
            })
          }).catch((e) => {
            console.log(e)
          })
        }
      )
    }).catch((e) => {
      console.log(e)
    })
  }

  componentWillReceiveProps (nextProps) {

    if (nextProps !== this.props) {
      const data = this.initialize(nextProps)

      this.setState(
        {
          ...data
        },
        () => {
          setTimeout(() => {
            const { value } = this.state

            value.forEach((item, index) => {
              this.scrollTo(index, item)
            })
          })
        }
      )
    }
  }

  getUIData (element, accurateHeight, maxCount?) {
    let count = 0
    maxCount = maxCount == null ? 20 : maxCount

    return new Promise((resolve, reject) => {
      let toCheck = null
      let measure = () => {
        let ret = null

        element.measure((x, y, width, height, left, top) => {
          // console.log(
          //   `Get container height: ${height}, accurate height: ${accurateHeight} and target item height: ${
          //     this.targetItemHeight
          //   } for ${++count}th.`
          // )

          if (height) {
            // 安卓机器获取高度不精确
            const needToReset = height % 1 === 0 ? false : true
            let minHeight
            let maxHeight

            if (needToReset) {
              minHeight = Math.floor(height)
              maxHeight = minHeight + 1
            } else {
              minHeight = maxHeight = height
            }

            if (
              (minHeight === accurateHeight || maxHeight === accurateHeight) &&
              this.targetItemHeight
            ) {
              ret = {
                rect: {
                  x,
                  y,
                  width,
                  height
                },
                targetItemHeight: this.targetItemHeight
              }
            }
          }

          toCheck(ret)
        })
      }

      toCheck = (ret) => {
        if (ret) {
          return resolve(ret)
        } else {
          if (count < maxCount) {
            setTimeout(() => {
              measure()
            }, 20)
          } else {
            return reject('获取元素高度失败！')
          }
        }
      }

      measure()
    })
  }

  resizeContainerHeight (targetItemHeight) {
    const { offsetCount } = this.props
    const ret = targetItemHeight + 2 * (targetItemHeight * offsetCount)
    return ret
  }

  locateIndicator (targetItemHeight) {
    const styles = scrollpickerStyles
    const { offsetCount } = this.props

    return (
      <View style={[styles.indicator]} pointerEvents='none'>
        <View
          style={[
            styles.indicator,
            styles.indicatorMask,
            { bottom: targetItemHeight + offsetCount * targetItemHeight },
            { borderBottomWidth: 1 * px, borderBottomColor: variables.mtdBorderColorDark }
          ]}
        />

        <View
          style={[
            styles.indicator,
            styles.indicatorMask,
            { top: targetItemHeight + offsetCount * targetItemHeight },
            { borderTopWidth: 1 * px, borderTopColor: variables.mtdBorderColorDark }
          ]}
        />
      </View>
    )
  }

  scrollTo (scrollIndex, targetItemIndex, animated?) {
    const { targetItemHeight } = this.state
    // const { offsetCount } = this.props
    this.scrollProper(scrollIndex, targetItemHeight * targetItemIndex, animated)
  }

  onScroll (scrollIndex, scrollHeight) {
    const targetItemIndex = this.scrollProper(scrollIndex, scrollHeight)

    this.props.onChange && this.props.onChange(scrollIndex, targetItemIndex)
  }

  scrollProper (scrollIndex, scrollHeight, animated?) {
    const { targetItemHeight, list } = this.state
    const { offsetCount } = this.props
    const scrollListLength = list[scrollIndex].length

    let newScrollHeight

    const min = 0
    const max = (scrollListLength - 2 * offsetCount - 1) * targetItemHeight

    if (scrollHeight <= min) {
      newScrollHeight = min
    } else if (scrollHeight >= max) {
      newScrollHeight = max
    } else {
      const quotient = parseInt(String(scrollHeight / targetItemHeight), 10)
      newScrollHeight = quotient * targetItemHeight

      const halfHeight = targetItemHeight / 2

      if (scrollHeight - newScrollHeight > halfHeight) {
        newScrollHeight += targetItemHeight
      }
    }

    this.scrollers[scrollIndex].scrollTo({
      x: 0,
      y: newScrollHeight,
      animated: animated === false ? false : true
    })

    const targetItemIndex = newScrollHeight / targetItemHeight
    return targetItemIndex
  }

  render () {
    const styles = scrollpickerStyles
    const { list, proportion, containerHeight, targetItemHeight } = this.state

    return (
      <View
        ref={el => {
          this.containerRef = el
        }}
        style={[
          styles.container,
          this.props.style,
          { height: containerHeight || DEFAULT_CONTAINER_HEIGHT }
        ]}
      >
        {containerHeight && this.locateIndicator(targetItemHeight)}

        {list.map((scrollItem, scrollIndex) => {
          return (
            <View
              key={scrollIndex}
              style={[
                styles.proportionWrapper,
                { flex: Number(proportion[scrollIndex]) }
              ]}
            >
              <ScrollView
                ref={c => {
                  this.scrollers[scrollIndex] = c
                }}
                style={styles.scroller}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollerContentContainer]}
                onScrollEndDrag={(e) => {
                  this.onScroll(scrollIndex, (e as any).nativeEvent.contentOffset.y)
                }}
              >
                {scrollItem.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={[styles.targetItem, { height: targetItemHeight }]}
                      onLayout={e => {
                        if (
                          item &&
                          this.targetItemHeight == null &&
                          e.nativeEvent.layout.height
                        ) {
                          this.targetItemHeight = Math.ceil(
                            e.nativeEvent.layout.height
                          )
                          // console.log(
                          //   'OnLayout get target item height:',
                          //   this.targetItemHeight
                          // )
                        }
                      }}
                    >
                      {
                        this.props.renderItem ? this.props.renderItem(item, index) :
                        <Text
                          style={[
                            styles.targetItemContent
                          ]}
                          numberOfLines={1}
                        >
                          {typeof item === 'object' ? item.label : item}
                        </Text>
                      }
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          )
        })}
      </View>
    )
  }
}
