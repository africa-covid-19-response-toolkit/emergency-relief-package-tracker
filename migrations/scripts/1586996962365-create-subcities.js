'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subcities', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      area: {
        type: Sequelize.GEOMETRY,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'createdat'
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedat'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subcities');
  },
};
