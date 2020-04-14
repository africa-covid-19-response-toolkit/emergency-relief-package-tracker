// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const deliveries = sequelizeClient.define('deliveries', {
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    num_of_packages_delivered: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.GEOMETRY,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat'
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  deliveries.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return deliveries;
};
