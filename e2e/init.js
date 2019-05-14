const detox = require('detox')
const config = require('../package.json').detox
const adapter = require('detox/runners/jest/adapter')
const specReporter = require('detox/runners/jest/specReporter')

jest.setTimeout(300000)
jasmine.getEnv().addReporter(adapter);
jasmine.getEnv().addReporter(specReporter);


beforeAll(async () => {
  await detox.init(config)
})

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup()
})