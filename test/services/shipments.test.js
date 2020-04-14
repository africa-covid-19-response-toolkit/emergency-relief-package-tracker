const assert = require('assert');
const app = require('../../src/app');

describe('\'shipments\' service', () => {
  it('registered the service', () => {
    const service = app.service('shipments');

    assert.ok(service, 'Registered the service');
  });
});
