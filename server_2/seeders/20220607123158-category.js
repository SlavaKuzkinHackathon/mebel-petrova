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
    await queryInterface.bulkInsert('categories', [{
       id: 1,
       name: 'Apple',
       createdAt: '2022-06-28T10:49:46.539Z',
       updatedAt: '2022-06-28T10:49:46.539Z'
     }, {
      id: 2,
      name: 'Samsung',
      createdAt: '2022-06-28T13:27:14.763Z',
      updatedAt: '2022-06-28T14:10:05.387Z'
    }, {
      id: 3,
      name: 'Xiaomi',
      createdAt: '2022-06-28T13:27:25.727Z',
      updatedAt: '2022-06-28T14:10:21.660Z'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('categories', null, {});
  }
};
