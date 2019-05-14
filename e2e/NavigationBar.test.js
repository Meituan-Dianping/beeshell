describe('NavigationBar test', () => {
  it('NavigationBar screen', async () => {
    await element(by.id('NavigationBar')).tap()
    await element(by.id('back').withAncestor(by.id('nav1'))).tap()
    await expect(element(by.id('text'))).toBeVisible()
    await element(by.id('forward').withAncestor(by.id('nav1'))).tap()
    await element(by.id('back').withAncestor(by.id('navigationBarNavigationBar'))).tap()
  })
})