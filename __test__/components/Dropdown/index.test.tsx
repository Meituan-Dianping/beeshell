import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Dropdown } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Dropdown', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
    }
    wrapper = shallow(
      <Dropdown { ...props } />
    )
    instance = wrapper.instance()
    instance.slideModal = {
      open: jest.fn(() => {
        return Promise.resolve()
      }),
      close: jest.fn(() => {
        return Promise.resolve()
      })
    }
    instance.open()
    instance.close()
  })
})
