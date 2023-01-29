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
    await queryInterface.bulkInsert('users', [{
       id: 1,
       name: 'admin',
       email: 'admin@gmail.com',
       password: '$2b$10$fmzVVk6J32SpAYNjTq8S3e635TPcrxlG8zi56w07jKOa7s6XLgFme',
       role: 1,
       createdAt: '2022-06-27T15:57:43.794Z',
       updatedAt: '2022-06-27T15:57:44.017Z'
     }, {
      id: 2,
      name: 'tom',
      email: 'tom@gmail.com',
      password: '$2b$10$JrgRrPpCXlLYa/D50f27cO2IMq4geKZLW4tIdHLi9vCWe4edBYhTS',
      role: 0,
      createdAt: '2022-06-27T15:59:20.200Z',
      updatedAt: '2022-06-27T15:59:20.379Z'
    }, {
      id: 3,
      name: 'john',
      email: 'john@gmail.com',
      password: '$2b$10$PtouUsdiJWywmE4KuJa2LefmIPkSV0BUhqKON6A.s7cJpiiRoNYlS',
      role: 0,
      createdAt: '2022-06-28T16:16:45.510Z',
      updatedAt: '2022-06-28T16:16:45.676Z'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
