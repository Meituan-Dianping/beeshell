import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Topview, TopviewGetInstance } from '../../../src/'
import { View } from 'react-native'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')
jest.useFakeTimers()

describe('Topview', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {

    }
    wrapper = shallow(
      <Topview { ...props }></Topview>
    )
    instance = TopviewGetInstance()
    instance.add(<View></View>)
    jest.runAllTimers()
    instance.replace(<View></View>, 1)
    jest.runAllTimers()
    instance.remove(1)
    jest.runAllTimers()
    instance.componentWillUnmount()
  })
})
