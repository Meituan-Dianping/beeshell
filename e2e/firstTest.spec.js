const detox = require('detox')
const config = require('../package.json').detox
jest.setTimeout(50000)

describe('e2e test', () => {
  it('example screens', async () => {
    if (typeof(device) == 'undefined') {
      await detox.init(config)
    }
    await device.shake()
    await device.reloadReactNative()
    
    /**
     * Button compoennt
     */
    await element(by.id('Button')).tap()

    await expect(element(by.id('btn1'))).toBeVisible()
    await element(by.id('btn1')).tap()
    await expect(element(by.id('text'))).toBeVisible()

    await element(by.id('back').withAncestor(by.id('navigationBarButton'))).tap()
    
    /**
     * Icon compoennt
     */
    await element(by.id('Icon')).tap()
    await element(by.id('back').withAncestor(by.id('navigationBarIcon'))).tap()
    
    /**
     * NavigationBar component
     */
    await element(by.id('NavigationBar')).tap()
    await element(by.id('back').withAncestor(by.id('nav1'))).tap()
    await expect(element(by.id('text'))).toBeVisible()
    await element(by.id('forward').withAncestor(by.id('nav1'))).tap()
    await element(by.id('back').withAncestor(by.id('navigationBarNavigation'))).tap()

  })
})


// it('should show world screen after tap', async () => {
    // await element(by.id('hello_button')).tap()
    // await expect(element(by.text('Hello!!!'))).toBeVisible()
  //   await element(by.id('world_button')).tap()
  //   await expect(element(by.text('World!!!'))).toBeVisible()
  // })