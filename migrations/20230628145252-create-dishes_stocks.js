'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dishes_stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      dishId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'dishes',
            schema: 'public'
          },
          key: 'id'
        },
        allowNull: false
      },
      stockId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'stocks',
            schema: 'public'
          },
          key: 'id'
        },
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dishes_stocks');
  }
};