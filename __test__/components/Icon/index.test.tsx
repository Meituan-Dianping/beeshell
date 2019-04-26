import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Icon } from '../../../src/'

configure({ adapter: new Adapter() })

describe('Icon', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props

    props = {
    }
    wrapper = shallow(
      <Icon { ...props }></Icon>
    )
    instance = wrapper.instance()

    props = {
      size: null
    }

    wrapper = shallow(
      <Icon { ...props }></Icon>
    )

    instance = wrapper.instance()
  })
})
