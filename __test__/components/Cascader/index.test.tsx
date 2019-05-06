import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Cascader } from '../../../src/'

configure({ adapter: new Adapter() })
jest.useFakeTimers()

describe('Cascader', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      data: [
        { label: '北京', id: 'beijing' },
        { label: '朝阳区', id: 'chaoyangqu', pId: 'beijing' }
      ],
      value: ['beijing'],
      dataStructureType: 'flattened'
    }
    wrapper = shallow(<Cascader { ...props } />)
    instance = wrapper.instance()
    const fieldKeys = instance.getFieldKeys()
    Cascader.getCheckedInfo(props.data, 'radio', fieldKeys)
    Cascader.recursiveAncestors(props.data, props.data[1], fieldKeys)
    instance.handlePress(props.data[0], 0)
    instance.componentWillReceiveProps(props)

    props = {
      ...props,
      dataStructureType: 'nested',
      data: [
        {
          label: '北京', id: 'beijing',
          children: [
            { label: '朝阳区', id: 'chaoyangqu' }
          ]
        },
      ]
    }

    wrapper = shallow(<Cascader { ...props } />)
  })
})
