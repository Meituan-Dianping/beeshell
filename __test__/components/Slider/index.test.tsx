import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Slider } from '../../../src/'
import { Platform } from 'react-native'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Slider', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
    }
    wrapper = shallow(
      <Slider { ...props }></Slider>
    )
    instance = wrapper.instance()
    instance.componentWillReceiveProps(props)
    const e = {
      nativeEvent: {
        locationX: 100,
        locationY: 100
      }
    }
    const gestureState = {
      dy: 1,
      dx: 2
    }
    instance.thumbTouchCheck(e)
    instance.touchStart(e)
    instance.pressStart(e)
    instance.touchEnd({}, e)
    instance.scroll(gestureState)
    instance.lastMove({}, gestureState)

    props = {
      step: 1,
      range: true,
      value: [1, 2],
      marks: [1, 2],
      vertical: true,
      showTip: true
    }
    Platform.OS = 'android'
    wrapper = shallow(
      <Slider { ...props }></Slider>
    )
    instance = wrapper.instance()
    instance.thumbTouchCheck(e)
    instance.touchStart(e)
    instance.pressStart(e)
    instance.touchEnd({}, e)
    instance.scroll(gestureState)
    instance.lastMove({}, gestureState)
    instance.getValueByProps(true)
  })
})
