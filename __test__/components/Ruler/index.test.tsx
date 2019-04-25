import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Ruler } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Ruler', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      onPress: jest.fn()
    }
    wrapper = shallow(
      <Ruler { ...props }></Ruler>
    )
    instance = wrapper.instance()
    instance.componentWillUnmount()
    instance.renderFullScreenView()
  })
})
