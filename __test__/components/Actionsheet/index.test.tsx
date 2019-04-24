import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Actionsheet } from '../../../src'
import { View } from 'react-native'

configure({ adapter: new Adapter() })

describe('Actionsheet', () => {
  test('it render base correctly', () => {
    let props
    let wrapper
    let instance

    props = {
      heading: <View></View>,
      title: '1111',
      data: [
        { text: '选项 1', value: '1' },
        { text: '选项 2', value: '2' },
        { text: '选项 3', value: '3' },
        { text: '选项 4', value: '4' },
        { text: '选项 5', value: '5' },
        { text: '选项 6', value: '6' }
      ],

      onPressConfirm: (item, index) => {
        expect(item).toEqual({ text: 1, value: 1 })
        expect(index).toEqual(1)
      },
      onPressCancel: (item, index) => {
        expect(item).toEqual(undefined)
      }
    }
    wrapper = shallow(<Actionsheet { ...props } />)
    instance = wrapper.instance()
    instance.getHeader()
    instance.getBody()
    instance.getContent()
    instance.close = jest.fn(() => {
      return {
        then: (callback) => {
          callback()
          return {
            catch: () => {
            }
          }
        }
      }
    })
    instance.handlePress('confirm', { text: 1, value: 1 }, 1)
    instance.handlePress('cancel')

    props.heading = null
    wrapper = shallow(<Actionsheet { ...props } />)
    instance = wrapper.instance()
    instance.getHeader()

    props.heading = null
    props.title = null
    wrapper = shallow(<Actionsheet { ...props } />)
    instance = wrapper.instance()
    instance.getHeader()

  })
})
