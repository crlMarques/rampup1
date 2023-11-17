'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('dishes_stocks', [
      {
          quantity: 1,
          dishId: 1,
          stockId: 40
      },
      {
          quantity: 1,
          dishId: 1,
          stockId: 3
      },
      {
          quantity: 2,
          dishId: 1,
          stockId:41
      },
      {
          quantity: 1,
          dishId: 1,
          stockId:33
      },
      {
          quantity: 1,
          dishId: 1,
          stockId: 42
      },
      {
          quantity: 1,
          dishId: 1,
          stockId: 39
      },
      {
          quantity: 1,
          dishId: 1,
          stockId: 7
      },
      {
          quantity: 1,
          dishId: 1,
          stockId: 8
      }
      ],{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dishes', null, {});
  }
};
