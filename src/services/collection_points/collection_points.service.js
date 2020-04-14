// Initializes the `collection_points` service on path `/collection-points`
const {
  CollectionPoints
} = require('./collection_points.class');
const createModel = require('../../models/collection_points.model');
const hooks = require('./collection_points.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/collection_points', new CollectionPoints(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('collection_points');

  service.hooks(hooks);
};
