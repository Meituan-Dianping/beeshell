describe('app test', () => {
  it('Button screen', async () => {
    await element(by.id('Button')).tap()

    await expect(element(by.id('btn1'))).toBeVisible()
    await element(by.id('btn1')).tap()
    await element(by.id('btn1')).tap()
    await element(by.id('btn1')).tap()
    await expect(element(by.id('text'))).toBeVisible()

    await element(by.id('back').withAncestor(by.id('navigationBarButton'))).tap()
  })

  it('Icon screen', async () => {
    await element(by.id('Icon')).tap()
    await element(by.id('back').withAncestor(by.id('navigationBarIcon'))).tap()
  })

  it('NavigationBar screen', async () => {
    await element(by.id('NavigationBar')).tap()
    await element(by.id('back').withAncestor(by.id('nav1'))).tap()
    await expect(element(by.id('text'))).toBeVisible()
    await element(by.id('forward').withAncestor(by.id('nav1'))).tap()
    await element(by.id('back').withAncestor(by.id('navigationBarNavigationBar'))).tap()
  })

  it('Dropdown screen', async () => {
    await element(by.id('Dropdown')).tap()
    await expect(element(by.id('a1'))).toBeVisible()
    await element(by.id('a1')).tap()
    await expect(element(by.id('o1'))).toBeVisible()
    await element(by.id('o1')).tap()
    await element(by.id('a1')).tap()
    await expect(element(by.id('backdrop'))).toBeVisible()
    await element(by.id('backdrop')).tap()
    await expect(element(by.id('back').withAncestor(by.id('navigationBarDropdown')))).toBeVisible()
    await element(by.id('back').withAncestor(by.id('navigationBarDropdown'))).tap()
  })
})