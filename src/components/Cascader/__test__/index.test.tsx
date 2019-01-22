import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Cascader } from '../'

configure({ adapter: new Adapter() })

describe('Cascader', () => {
  test('it render base correctly', () => {
    let props
    let wrapper
    let instance

    props = {
      onSyncData () {
        return new Promise((resolve) => {
          resolve([{
            label: 1,
            value: 2
          }])
        })
      },
      assignedOption: [1],
      itemStyle: {
        color: 'red'
      },
      itemSelectedStyle: {
        color: 'blue'
      }
    }
    wrapper = shallow(<Cascader { ...props } />)
    instance = wrapper.instance()

    instance.onSelectFinish([{ label: 1, value: 1 }])
    instance.onSelectChange([{ label: 1, value: 1 }])
    // instance.showNextLevel({ level: 1, label: 1, value: 1 })
    instance.renderList([{ label: 1, value: 1 }])
    instance.removeKeyStartsWith({ name: 1 }, 'name')
    props = {
      options: [
        {
          name: 1,
          val: 1,
          c: [
            {
              name: 1,
              val: 2
            }
          ]
        }
      ],
      structKeys: [ 'name', 'val', 'c' ],
      autoAddEntire: true
    }

    wrapper = shallow(<Cascader { ...props } />)
  })
})
