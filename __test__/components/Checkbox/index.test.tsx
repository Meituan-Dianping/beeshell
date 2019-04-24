import React from 'react'
import { Text, View } from 'react-native'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Checkbox } from '../../../src/'
import { CheckboxItemAllCheck } from '../../../src/components/Checkbox/CheckboxItemAllCheck'

configure({ adapter: new Adapter() })

describe('Checkbox', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      value: [1],
      showAllCheck: true,
      iconPosition: 'right' as any,
      onChange: jest.fn()
    }
    wrapper = shallow(
      <Checkbox
        {...props}>
        <Checkbox.Item label='11:00 - 13:00' value={1} />
        <Checkbox.Item renderItem={() => <Text>123</Text>} value={2}/>
        <Checkbox.Item label='19:00 - 22:00' value={3} />
        <View />
      </Checkbox>
    )
    instance = wrapper.instance()
    instance.handleChange(1, true)
    instance.handleChange(2, true)
    instance.handleChange(3, true)
    instance.handleChange(1, false)
    instance.handleChange(null, 1, true)
    instance.handleChange(null, 3, true)
    expect(props.onChange).toBeCalled()

    props = {
      showAllCheck: true,
      value: [1, 2, 3, 4]
    }
    wrapper = shallow(
      <Checkbox
        {...props}>
        <Checkbox.Item label='11:00 - 13:00' value={1} />
      </Checkbox>
    )

    props = {
      label: '11:00 - 13:00',
      value: 1
    }
    wrapper = shallow(
      <Checkbox.Item {...props}/>
    )

    wrapper.find('TouchableOpacity').simulate('press')
    instance = wrapper.instance()
    instance.componentWillReceiveProps({})

    props = {
      disabled: true
    }
    wrapper = shallow(
      <Checkbox.Item {...props}/>
    )
    wrapper.find('TouchableOpacity').simulate('press')

    props = {
      disabled: false,
      checkedStatus: 1
    }
    wrapper = shallow(
      <CheckboxItemAllCheck {...props}/>
    )
    wrapper.find('TouchableOpacity').simulate('press')
    instance = wrapper.instance()
    instance.componentWillReceiveProps({})

    props = {
      disabled: false,
      checkedStatus: 3
    }
    wrapper = shallow(
      <CheckboxItemAllCheck {...props}/>
    )
    wrapper.find('TouchableOpacity').simulate('press')

    props = {
      disabled: true
    }
    wrapper = shallow(
      <CheckboxItemAllCheck {...props}/>
    )
    wrapper.find('TouchableOpacity').simulate('press')
  })
})
