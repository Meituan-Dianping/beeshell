import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Form } from '../../../src/'
import { TextInput } from 'react-native'

configure({ adapter: new Adapter() })

describe('Form', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props = {
    }

    wrapper = shallow(
      <Form { ...props }>
        <Form.Item label='邮箱'>
          <TextInput />
        </Form.Item>
        <Form.Item label='名称'>
          <TextInput />
        </Form.Item>
      </Form>
    )

    wrapper = shallow(
      <Form.Item label='邮箱'><TextInput /></Form.Item>
    )
  })
})
