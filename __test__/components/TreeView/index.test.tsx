import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { TreeView } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('TreeView', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      data: [
        { label: '北京', id: 'beijing' },
        { label: '朝阳区', id: 'chaoyangqu', pId: 'beijing' },
      ],
      dataStructureType: 'flattened',
      onPress: jest.fn()
    }
    wrapper = shallow(
      <TreeView { ...props } />
    )
    instance = wrapper.instance()
    instance.handlePress(props.data[0])
  })
})
