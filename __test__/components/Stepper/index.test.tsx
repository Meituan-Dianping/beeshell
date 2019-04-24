import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Stepper } from '../../../src/'

configure({ adapter: new Adapter() })

describe('Stepper', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      min: 1, max: 10, value: 4
    }
    wrapper = shallow(
      <Stepper { ...props } />
    )

    instance = wrapper.instance()
    instance.onDecrease()
    instance.onIncrease()
    instance.onChangeText(1)
    instance.onChangeText('a')
    instance.onChangeText()

    instance.onChangeText(100)
    instance.onChangeText(-100)

    props = {
    }
    wrapper = shallow(
      <Stepper { ...props } />
    )

  })
})