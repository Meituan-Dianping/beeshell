import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Calendar } from '../../../src/'
import moment from 'moment'

configure({ adapter: new Adapter() })
jest.useFakeTimers()

describe('Calendar', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      date: '2012-01-02',
      locale: 'zh-cn',
      format: 'YYYY-MM-DD',
    }
    wrapper = shallow(<Calendar { ...props } />)
    instance = wrapper.instance()
    instance.changeDate('years', 'subtract')
    instance.componentWillReceiveProps(props)
    instance.selectDate({
      disabled: false,
      dateModel: moment()
    })
  })
})
