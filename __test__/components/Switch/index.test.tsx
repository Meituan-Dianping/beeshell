import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Switch } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Switch', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      value: true,
      onChange: jest.fn()
    }
    wrapper = shallow(
      <Switch { ...props }></Switch>
    )
    instance = wrapper.instance()
    instance.componentWillReceiveProps({
      ...props,
      value: false
    })
    instance.toggleSwitchToValue(true, false)
    instance.onPanResponderGrant()
    instance.onPanResponderMove({}, { dx: 9 })
    instance.onPanResponderRelease()
  })
})
