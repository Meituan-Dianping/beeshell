describe('Dropdown test', () => {
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