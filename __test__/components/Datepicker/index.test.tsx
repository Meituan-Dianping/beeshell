import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Datepicker } from '../../../src/'

configure({ adapter: new Adapter() })
jest.useFakeTimers()

describe('Datepicker', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      proportion: [1, 1, 1],
      startYear: 2010,
      numberOfYears: 10,
      date: '2016-03-30'
    }
    wrapper = shallow(<Datepicker { ...props } />)
    instance = wrapper.instance()
    instance.handleChange(1, 2)
    instance.componentWillReceiveProps(props)
  })
})
