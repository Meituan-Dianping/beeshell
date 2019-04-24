import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Scrollpicker } from '../../../src/'

configure({ adapter: new Adapter() })
jest.useFakeTimers()

describe('Scrollpicker', () => {
  test('it render base correctly', () => {
    let props
    let wrapper
    let instance

    props = {
    }
    wrapper = shallow(<Scrollpicker { ...props } />)
    instance = wrapper.instance()
    instance.state.targetItemHeight = 20
    instance.state.containerHeight = 140
    instance.resizeContainerHeight(120)
    instance.locateIndicator(24)

    instance.targetItemHeight = 20
    instance.getUIData({
      measure: (callback) => {
        callback(1, 2, 3, 4.2, 5, 6)
      }
    }, 5, 3)

    instance.getUIData({
      measure: (callback) => {
        callback(1, 2, 3, 4, 5, 6)
      }
    }, 12, 3)
    instance.componentWillReceiveProps({
      list: [[{}]]
    })
    // console.log(instance)
    // instance.scrollTo(1, 1, true)
    // instance.scrollProper(1, 12, true)
  })
})
