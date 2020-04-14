// Initializes the `shipments` service on path `/shipments`
const { Shipments } = require('./shipments.class');
const createModel = require('../../models/shipments.model');
const hooks = require('./shipments.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/shipments', new Shipments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('shipments');

  service.hooks(hooks);
};
