'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', {
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
      unit: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
    return queryInterface.dropTable('items');
  },
};
