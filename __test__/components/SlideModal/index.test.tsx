import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SlideModal } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('SlideModal', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      screenWidth: 100,
      screenHeight: 100,
      offsetX: 1,
      offsetY: 1,
      direction: 'up',
      align: 'right',
      fullScreenPatch: [true, true, true]
    }
    wrapper = shallow(
      <SlideModal { ...props }>111</SlideModal>
    )
    instance = wrapper.instance()
    instance.open()
    instance.close()
    instance.getContent()
    instance.componentWillReceiveProps({
      ...props,
      direction: 'down'
    })
    instance.getContent()
    instance.componentWillReceiveProps({
      ...props,
      direction: 'left',
      align: 'up'
    })

    instance.componentWillReceiveProps({
      ...props,
      direction: ['left', 'up']
    })
    instance.getContent()
  })
})
