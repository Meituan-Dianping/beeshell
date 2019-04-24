import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Tab } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Tab', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      data: [
        { label: 1 }
      ]
    }
    wrapper = shallow(
      <Tab { ...props }></Tab>
    )

    wrapper.find('TouchableOpacity').simulate('press')
  })
})
