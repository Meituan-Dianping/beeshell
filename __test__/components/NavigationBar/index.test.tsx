import React from 'react'
import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import { NavigationBar } from '../../../src/'

describe('NavigationBar', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props

    props = {
      title: '标题',
      onPressBack: jest.fn(() => {}),
      onPressForward: jest.fn(() => {})
    }
    wrapper = shallow(
      <NavigationBar {...props}/>
    )
    wrapper.find('TouchableOpacity').simulate('press')
    expect(props.onPressBack).toBeCalledWith()

    props = {
      backLabel: null
    }
    wrapper = shallow(
      <NavigationBar {...props}/>
    )
  })
})
