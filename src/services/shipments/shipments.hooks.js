const {
  authenticate
} = require('@feathersjs/authentication').hooks;

const validateOrganizationPin = require('../../hooks/validate-organization-pin');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateOrganizationPin()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
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

//authenticate('jwt')
