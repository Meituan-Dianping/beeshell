import React from 'react'
import { View, Text } from 'react-native'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Badge }from '../'

configure({ adapter: new Adapter() })

describe('Badge Snapshot', () => {
  test('renders default type', () => {
    const props = { title: '测试tag' }
    const wrapper = shallow(
      <Badge { ...props } />
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Badge', () => {
  test('it render default type with "text"', () => {
    const wrapper = shallow(
      <Badge/>
    )
    expect(wrapper.instance().props).toEqual({ type: 'text' })
  })

  test('it render dot correctly', () => {
    const wrapper = shallow(
      <Badge type={'dot'}/>
    )
    expect(wrapper.instance().props).toEqual({ type: 'dot' })
  })

  test('it render triangle correctly', () => {
    const wrapper = shallow(
      <Badge type={'triangle'} title={'优惠'} />
    )
    expect(wrapper.instance().props).toEqual({ type: 'triangle', title: '优惠' })
  })

  test('it can set title with number type', () => {
    const wrapper = shallow(
      <Badge title={111} />
    )
    expect(wrapper.instance().props).toEqual({ title: 111, type: 'text' })
  })

  test('it can render slot correctly', () => {
    const wrapper = shallow(
      <Badge title={111} >
        <View><Text>aaa</Text></View>
      </Badge>
    )
    expect(wrapper.contains(<View><Text>aaa</Text></View>)).toEqual(true)
    expect(wrapper.contains(<View><Text>111</Text></View>)).toEqual(false)
  })

})
