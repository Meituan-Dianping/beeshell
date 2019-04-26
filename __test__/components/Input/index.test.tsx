import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Input } from '../../../src/'
import { Platform } from 'react-native'

configure({ adapter: new Adapter() })

describe('Input', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props = {
      value: '11',
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn(),
    }

    wrapper = shallow(
       <Input {...props}/>
    )
    wrapper.find('TextInput').simulate('change', { target: { value: '22' } })
    wrapper.find('TextInput').simulate('focus')
    expect(props.onFocus).toBeCalled()
    wrapper.find('TextInput').simulate('blur')
    expect(props.onBlur).toBeCalled()

    instance = wrapper.instance()
    instance.handleChange('22')
    expect(props.onChange).toBeCalledWith('22')

    Platform.OS = 'android'
    wrapper = shallow(
      <Input {...props}/>
    )
    wrapper.find('TextInput').simulate('change', { target: { value: '22' } })
    wrapper.find('TextInput').simulate('focus')
    expect(props.onFocus).toBeCalled()
    wrapper.find('TextInput').simulate('blur')
    expect(props.onBlur).toBeCalled()
    instance = wrapper.instance()
    instance.state.isEditing = true
    wrapper.find('TouchableOpacity').simulate('press')
  })
})
