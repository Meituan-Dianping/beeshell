import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Badge } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Badge', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
    }
    wrapper = shallow(
      <Badge { ...props }></Badge>
    )

    props = {
      label: 'xxx'
    }
    wrapper = shallow(
      <Badge { ...props }></Badge>
    )
  })
})
