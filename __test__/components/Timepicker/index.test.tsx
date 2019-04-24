import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Timepicker } from '../../../src/'

configure({ adapter: new Adapter() })
jest.useFakeTimers()

describe('Timepicker', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      value: '10:10:10'
    }
    wrapper = shallow(<Timepicker { ...props } />)
    instance = wrapper.instance()
    instance.handleChange(1, 2)
    instance.componentWillReceiveProps(props)
  })
})
