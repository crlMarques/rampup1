'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('dishes', [{
        name: 'Pizza'
      },{
        name: 'X-Burguer'
      },{
        name: 'Lasanha'
      },{
        name: 'Salmão Grelhado'
      },{
        name: 'Risoto de Cogumelos'
      },{
        name: 'Strogonoff de Frango'
      },{
        name: 'Feijoada'
      },{
        name: 'Nhoque de Batata'
      },{
        name: 'Salada Caesar'
      },{
        name: 'Hambúrguer com Batata Frita'
      },{
        name: 'Penne ao Molho Pesto'
      }],{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dishes', null, {});
  }
};
