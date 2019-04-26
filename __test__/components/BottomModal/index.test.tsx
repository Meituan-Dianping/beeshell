import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BottomModal } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('BottomModal', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
    }
    wrapper = shallow(
      <BottomModal { ...props }>111</BottomModal>
    )
    instance = wrapper.instance()
    instance.open()
    instance.close()
    instance.getContent()
  })
})
