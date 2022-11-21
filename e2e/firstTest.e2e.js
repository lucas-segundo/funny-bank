const { by, device, element } = require('detox')

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should have welcome screen', async () => {
    const info = element(
      by.text('Open up App.js to start working on your app!!')
    )
    await device.takeScreenshot('home-test')
    await expect(info).toBeVisible()
  })
})
