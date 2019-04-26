import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Longlist } from '../../../src/'

configure({ adapter: new Adapter() })
jest.mock('InteractionManager')

describe('Longlist', () => {
  test('it render base correctly', () => {
    let wrapper
    let instance
    let props: any = {
      total: 10,
      data: [
        { label: '北京', id: 'beijing' },
        { label: '朝阳区', id: 'chaoyangqu', pId: 'beijing' },
      ],
      renderItem: jest.fn(),
      onRefresh: jest.fn(() => {
        return Promise.resolve()
      }),
      onEndReached: jest.fn(() => {
        return Promise.resolve()
      })
    }
    wrapper = shallow(
      <Longlist { ...props } />
    )
    instance = wrapper.instance()
    instance.handleEndReached()
    instance.renderFooter()
    instance.handleRefresh()

    instance.state.loading = false
    instance.renderFooter()
    instance.state.loading = true
    instance.handleEndReached()

    instance.state.refreshing = true
    instance.handleRefresh()

    props = {
      total: 0,
      data: [
      ]
    }
    wrapper = shallow(
      <Longlist { ...props } />
    )
    instance = wrapper.instance()
    instance.state.loading = false
    instance.renderFooter()
    instance.handleEndReached()

    props = {
      total: 1,
      data: [
        { label: '北京', id: 'beijing' },
      ],
      onEndReached: jest.fn(() => {
        return Promise.resolve()
      })
    }
    wrapper = shallow(
      <Longlist { ...props } />
    )
    instance = wrapper.instance()
    instance.state.loading = false
    instance.renderFooter()
    instance.handleEndReached()
  })
})
