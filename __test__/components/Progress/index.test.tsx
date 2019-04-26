import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Progress } from '../../../src/'

configure({ adapter: new Adapter() })
jest.useFakeTimers()

describe('Progress', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      percent: 90,
      easing: true
    }
    wrapper = shallow(<Progress { ...props } />)
    instance = wrapper.instance()
    instance.componentWillReceiveProps({
      percent: 20
    })
    instance.getWidthByPercent(100, 90)
    instance.onLayout({
      nativeEvent: {
        layout: {
          width: 1
        }
      }
    })
  })
})
