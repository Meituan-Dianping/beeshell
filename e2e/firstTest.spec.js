const detox = require('detox')
const config = require('../package.json').detox
// jest.setTimeout(50000)



describe('e2e test', () => {
  it('example screens', async () => {
    console.log('device init')
    await detox.init(config)
    console.log('device init success')
    
    await device.shake()
    await device.reloadReactNative()
    await resolveAfter()
    
    // /**
    //  * Button compoennt
    //  */
    // await element(by.id('Button')).tap()

    // await expect(element(by.id('btn1'))).toBeVisible()
    // await element(by.id('btn1')).tap()
    // await element(by.id('btn1')).tap()
    // await element(by.id('btn1')).tap()
    // await expect(element(by.id('text'))).toBeVisible()

    // await element(by.id('back').withAncestor(by.id('navigationBarButton'))).tap()
    
    // /**
    //  * Icon compoennt
    //  */
    // await element(by.id('Icon')).tap()
    // await element(by.id('back').withAncestor(by.id('navigationBarIcon'))).tap()
    
    // /**
    //  * NavigationBar component
    //  */
    // await element(by.id('NavigationBar')).tap()
    // await element(by.id('back').withAncestor(by.id('nav1'))).tap()
    // await expect(element(by.id('text'))).toBeVisible()
    // await element(by.id('forward').withAncestor(by.id('nav1'))).tap()
    // await element(by.id('back').withAncestor(by.id('navigationBarNavigationBar'))).tap()

    // /**
    //  * Dropdown component
    //  */
    // await expect(element(by.id('Dropdown'))).toBeVisible()
    // await element(by.id('Dropdown')).tap()
    // await expect(element(by.id('btn1'))).toBeVisible()
    // await element(by.id('btn1')).tap()
    // await expect(element(by.id('o1'))).toBeVisible()
    // await element(by.id('o1')).tap()
    // await resolveAfter()
    // await element(by.id('back').withAncestor(by.id('navigationBarDropdown'))).tap()

    /**
     * Form component
     */
    await expect(element(by.id('Form'))).toBeVisible()
    await element(by.id('Form')).tap()
    await expect(element(by.id('input1'))).toBeVisible()
    await element(by.id('input1')).replaceText('1111')
    await expect(element(by.id('txt1'))).toBeVisible()
    await element(by.id('input1')).replaceText('Lulu')
    await expect(element(by.id('txt1'))).toBeNotVisible()
    // await element(by.id('back').withAncestor(by.id('navigationBarForm'))).tap()
  })
})


// it('should show world screen after tap', async () => {
    // await element(by.id('hello_button')).tap()
    // await expect(element(by.text('Hello!!!'))).toBeVisible()
  //   await element(by.id('world_button')).tap()
  //   await expect(element(by.text('World!!!'))).toBeVisible()
  // })


  function resolveAfter(duration) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(1)
      }, duration || 2000)
    })
  }
  