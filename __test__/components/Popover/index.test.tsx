import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Popover } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Popover', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
    }
    wrapper = shallow(
      <Popover { ...props }>111</Popover>
    )
    instance = wrapper.instance()
    instance.open()
    instance.close()
    instance.getContent()
  })
})
