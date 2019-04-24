import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Tag } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Tag', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
    }
    wrapper = shallow(
      <Tag { ...props }>111</Tag>
    )

    // props = {
    //   label: 'xxx'
    // }
    // wrapper = shallow(
    //   <Tag { ...props }></Tag>
    // )
  })
})
