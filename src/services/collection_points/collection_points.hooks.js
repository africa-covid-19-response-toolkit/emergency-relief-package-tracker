const validateOrganizationPin = require('../../hooks/validate-organization-pin');
const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const associateCollectionPoints = require('../../hooks/associate-collection-points');
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
    find: [associateCollectionPoints()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
