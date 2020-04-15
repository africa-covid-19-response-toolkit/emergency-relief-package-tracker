const validateOrganizationPin = require('../../hooks/validate-organization-pin');
const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const associateOrganizationToCollectionCenter = require('../../hooks/associate-organization-to-collection-center');
module.exports = {
  before: {
    all: [],
    find: [associateOrganizationToCollectionCenter()],
    get: [associateOrganizationToCollectionCenter()],
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
