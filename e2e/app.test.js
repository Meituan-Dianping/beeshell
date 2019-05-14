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
})