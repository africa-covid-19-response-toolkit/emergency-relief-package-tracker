const users = require('./users/users.service.js');
const organizations = require('./organizations/organizations.service.js');
const subcities = require('./subcities/subcities.service.js');
const shipments = require('./shipments/shipments.service.js');
const collectionPoints = require('./collection_points/collection_points.service.js');
const items = require('./items/items.service.js');
const deliveries = require('./deliveries/deliveries.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(organizations);
  app.configure(subcities);
  app.configure(shipments);
  app.configure(collectionPoints);
  app.configure(items);
  app.configure(deliveries);
};
