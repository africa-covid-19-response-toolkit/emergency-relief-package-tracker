const assert = require('assert');
const app = require('../../src/app');

describe('\'subcities\' service', () => {
  it('registered the service', () => {
    const service = app.service('subcities');

    assert.ok(service, 'Registered the service');
  });
});
