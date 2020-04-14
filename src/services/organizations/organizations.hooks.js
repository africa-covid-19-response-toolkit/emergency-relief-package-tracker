const validOrganizations = require('../../hooks/valid-organizations');
const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const stripPin = require('../../hooks/strip-pin');

module.exports = {
  before: {
    all: [],
    find: [validOrganizations()],
    get: [validOrganizations()],
    create: [],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [stripPin()],
    get: [stripPin()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
