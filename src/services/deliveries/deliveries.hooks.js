const validateOrganizationPin = require('../../hooks/validate-organization-pin');
const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const removeDeliveryLocation = require('../../hooks/remove-delivery-location');
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
    find: [removeDeliveryLocation()],
    get: [removeDeliveryLocation()],
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
