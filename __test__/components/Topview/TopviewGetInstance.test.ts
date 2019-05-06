import * as topviewModule from '../../../src/components/Topview'

// @ts-ignore
topviewModule.TopviewGetInstance = () => {
  return {
    add: jest.fn(() => {
      return Promise.resolve(1)
    }),
    replace: jest.fn(() => {
      return Promise.resolve()
    }),
    remove: jest.fn(() => {
      return Promise.resolve()
    })
  }
}

describe('TopviewGetInstance', () => {
  test('', () => {

  })
})
