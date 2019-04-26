import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Dialog } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Dialog', () => {
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
      <Dialog { ...props }>111</Dialog>
    )
    instance = wrapper.instance()
    instance.open()
    instance.close()
    instance.getContent()
  })
})
