import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Tip } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Tip', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      screenWidth: 100,
      screenHeight: 100,
      offsetX: 1,
      offsetY: 1,
      animatedTranslateX: 1,
      animatedTranslateY: 2
    }
    wrapper = shallow(
      <Tip { ...props }>111</Tip>
    )
    instance = wrapper.instance()
    instance.open()
    instance.close()
    instance.getContent()
  })
})
