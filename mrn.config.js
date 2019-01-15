// mrn.config.js 配置文档
// https://123.sankuai.com/km/page/43311099

module.exports = {
  main: 'examples/index.ts',
  biz: 'mrn',
  name: 'roo-mobile-rn',
  platform: ['Android', 'iOS'],
  bundleDependencies: [
    '@mrn/mrn-base',
    '@mrn/mrn-common'
  ],
  debugger: {
    moduleName: 'roo-mobile-rn',
    initialProperties: {
      hideNavigationBar: true
    }
  }
}
