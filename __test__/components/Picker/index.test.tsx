import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Picker } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Picker', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      disabled: false
    }
    wrapper = shallow(
      <Picker { ...props }>111</Picker>
    )
    instance = wrapper.instance()
    instance.trigger = {
      measure: jest.fn((callback) => {
        callback(1, 2, 3, 4, 5, 6)
      })
    }
    instance.slideModal = {
      open: jest.fn(),
      close: jest.fn()
    }
    instance.handleToggle()
    instance.handlePress()
    instance.open()
    instance.close()
    // instance.getContent()
  })
})
