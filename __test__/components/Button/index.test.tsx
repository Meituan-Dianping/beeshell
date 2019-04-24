import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Button } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Button', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      onPress: jest.fn()
    }
    wrapper = shallow(
      <Button { ...props }></Button>
    )
    instance = wrapper.instance()
    wrapper.find('TouchableOpacity').simulate('press')
    expect(props.onPress).toBeCalled()

    instance.containerRef = {
      measure: jest.fn((callback) => {
        callback(1, 2, 3, 4, 5)
      })
    }

    instance.measure((...args) => {
      expect(args).toEqual([1, 2, 3, 4, 5])
    })
  })
})
