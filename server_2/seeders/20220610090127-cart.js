'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('carts', [{
      id: 1,
      userId: 2,
      productId: 3,
      quantity: 2,
      createdAt: '2022-06-28T15:43:04.918Z',
      updatedAt: '2022-06-28T15:43:04.918Z'
      }, {
      id: 2,
      userId: 2,
      productId: 5,
      quantity: 3,
      createdAt: '2022-06-28T15:43:18.955Z',
      updatedAt: '2022-06-28T16:37:04.486Z'
      }, {
      id: 3,
      userId: 2,
      productId: 4,
      quantity: 1,
      createdAt: '2022-06-28T15:43:52.503Z',
      updatedAt: '2022-06-28T16:37:33.330Z'
      }, {
      id: 4,
      userId: 3,
      productId: 5,
      quantity: 1,
      createdAt: '2022-06-28T16:20:47.600Z',
      updatedAt: '2022-06-28T16:20:47.600Z'
      }, { 
      id: 5,
      userId: 3,
      productId: 4,
      quantity: 1,
      createdAt: '2022-06-28T16:21:14.974Z',
      updatedAt: '2022-06-28T16:21:14.974Z'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('carts', null, {});
  }
};