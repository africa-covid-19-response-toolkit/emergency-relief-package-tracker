// Initializes the `deliveries` service on path `/deliveries`
const { Deliveries } = require('./deliveries.class');
const createModel = require('../../models/deliveries.model');
const hooks = require('./deliveries.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/deliveries', new Deliveries(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('deliveries');

  service.hooks(hooks);
};
