// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const {
  NotFound,
  GeneralError,
  BadRequest
} = require('@feathersjs/errors');
module.exports = (options = {}) => {
  return async context => {
    // Request the organization id from the organization database
    let organization = await context.app.service('organizations').get(parseInt(context.data.organizationId), {
      internal: true
    });

    // If the organization id in the request matches the one in the db, return context else throw error
    if (organization.pin_code == parseInt(context.data.pin_code)) {
      return context;
    } else {
      throw new GeneralError(new Error('The Organization PIN code is incorrect'));
    }
  };
};
