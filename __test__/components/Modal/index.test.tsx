import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Modal } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Modal', () => {
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
      <Modal { ...props }>111</Modal>
    )
    instance = wrapper.instance()
    instance.modalState.topviewId = 1
    instance.open()
    instance.close()
    instance.getContent()
    instance.handlePressBackdrop()
    instance.handleLayout({
      nativeEvent: {
        layout: { x: 1, y: 2, width: 3, height: 4 }
      }
    })
    instance.componentWillReceiveProps(props)
    instance.componentWillUnmount()
  })
})
