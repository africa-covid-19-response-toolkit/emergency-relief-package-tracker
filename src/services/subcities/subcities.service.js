// Initializes the `subcities` service on path `/subcities`
const { Subcities } = require('./subcities.class');
const createModel = require('../../models/subcities.model');
const hooks = require('./subcities.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/subcities', new Subcities(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('subcities');

  service.hooks(hooks);
};
