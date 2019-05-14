describe('Form test', () => {
  it('Form screen', async () => {
    await expect(element(by.id('Form'))).toBeVisible()
    await element(by.id('Form')).tap()
    
    await expect(element(by.id('name'))).toBeVisible()
    await element(by.id('name')).replaceText('1111')
    await expect(element(by.id('nameInfo'))).toBeVisible()
    await element(by.id('name')).replaceText('Lulu')
    await expect(element(by.id('nameInfo'))).toBeNotVisible()

    await expect(element(by.id('phone'))).toBeVisible()
    await element(by.id('phone')).replaceText('aaa')
    await expect(element(by.id('phoneInfo'))).toBeVisible()
    await element(by.id('phone')).replaceText('13422243221')
    await expect(element(by.id('phoneInfo'))).toBeNotVisible()

    await expect(element(by.id('date'))).toBeVisible()
    await element(by.id('date')).tap()
    await expect(element(by.id('right'))).toBeVisible()
    await element(by.id('right')).tap()
    await expect(element(by.id('dateRemoveIcon'))).toBeVisible()
    await element(by.id('dateRemoveIcon')).tap()

    await expect(element(by.id('location'))).toBeVisible()
    await element(by.id('location')).tap()
    await element(by.id('location')).tap()

    await expect(element(by.id('scroller'))).toBeVisible()
    await element(by.id('scroller')).scrollTo('bottom')

    // await expect(element(by.id('r1'))).toBeVisible()
    // await element(by.id('r1')).tap()
    // await element(by.id('r2')).tap()
    await element(by.id('submit')).tap()
    // await element(by.id('back').withAncestor(by.id('navigationBarForm'))).tap()
  })
})