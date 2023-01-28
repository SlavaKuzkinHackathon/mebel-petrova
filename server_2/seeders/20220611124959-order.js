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
     await queryInterface.bulkInsert('orders', [{
      id: 1,
      userId: 2,
      productId: 3,
      quantity: 2,
      amount: 1798,
      address: {
          "country": "Azerbaijan",
          "city": "Baku"
      },
      status: 'pending',
      updatedAt: '2022-06-28T16:09:58.501Z',
      createdAt: '2022-06-28T16:09:58.501Z'
      }, {
      id: 2,
      userId: 2,
      productId: 5,
      quantity: 3,
      amount: 2097,
      address: {
          "country": "Azerbaijan",
          "city": "Baku"
      },
      status: 'pending',
      updatedAt: '2022-06-28T16:11:48.453Z',
      createdAt: '2022-06-28T16:11:48.453Z'
      }, {
      id: 3,
      userId: 2,
      productId: 4,
      quantity: 1,
      amount: 799,
      address: {
          "country": "Azerbaijan",
          "city": "Baku"
      },
      status: 'pending',
      updatedAt: '2022-06-28T16:12:11.430Z',
      createdAt: '2022-06-28T16:12:11.430Z'
      }, {
      id: 4,
      userId: 3,
      productId: 5,
      quantity: 1,
      amount: 699,
      address: {
          "country": "Azerbaijan",
          "city": "Baku"
      },
      status: 'pending',
      updatedAt: '2022-06-28T16:25:54.259Z',
      createdAt: '2022-06-28T16:25:54.259Z'
      }, {
      id: 5,
      userId: 3,
      productId: 4,
      quantity: 1,
      amount: 799,
      address: {
          "country": "Azerbaijan",
          "city": "Baku"
      },
      status: 'pending',
      updatedAt: '2022-06-28T16:26:07.033Z',
      createdAt: '2022-06-28T16:26:07.033Z'
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('orders', null, {});
  }
};
