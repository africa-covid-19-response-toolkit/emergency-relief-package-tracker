const assert = require('assert');
const app = require('../../src/app');

describe('\'collection_points\' service', () => {
  it('registered the service', () => {
    const service = app.service('collection-points');

    assert.ok(service, 'Registered the service');
  });
});
