import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Radio } from '../../../src/'
import { View } from 'react-native'

configure({ adapter: new Adapter() })

describe('Radio', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      value: 1,
      onChange: jest.fn()
    }

    wrapper = shallow(
      <Radio
        {...props}>
        <Radio.Item label='选项A' value={1} />
        <View></View>
      </Radio>
    )
    instance = wrapper.instance()
    instance.handleChange(1)
    expect(props.onChange).toBeCalledWith(1)
    instance.renderChildren()

    props = {
      label: '选项A',
      value: 1,
      disabled: false,
      checked: true,
      onChange: jest.fn()
    }
    wrapper = shallow(
      <Radio.Item { ...props } />
    )
    instance = wrapper.instance()
    wrapper.find('TouchableOpacity').simulate('press')

    props.disabled = true
    props.checked = false
    wrapper = shallow(
      <Radio.Item { ...props } />
    )
    instance = wrapper.instance()
    wrapper.find('TouchableOpacity').simulate('press')

  })
})
