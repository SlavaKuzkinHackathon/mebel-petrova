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
    await queryInterface.bulkInsert('products', [{
       id: 3,
       name: 'Iphone 13',
       description: 'Iphone 13 128 gb',
       categoryId: 1,
       price: 899,
       quantity: 23,
       sold: 2,
       photo: 'images\\1656430065069.iphone13.jpg',
       shipping: true,
       createdAt: '2022-06-28T15:27:45.102Z',
       updatedAt: '2022-06-28T16:09:58.490Z'
     }, {
      id: 4,
      name: 'Samsung S22',
      description: 'Samsung S22 128 gb',
      categoryId: 2,
      price: 799,
      quantity: 33,
      sold: 2,
      photo: 'images\\1656430762170.samsung s22.jpg',
      shipping: true,
      createdAt: '2022-06-28T15:29:49.963Z',
      updatedAt: '2022-06-28T16:26:07.028Z'
    }, {
      id: 5,
      name: 'Xiaomi Mi 12',
      description: 'Xiaomi Mi 12 128 gb',
      categoryId: 3,
      price: 699,
      quantity: 26,
      sold: 4,
      photo: 'images\\1656430252645.xiaomiMi12.jpg',
      shipping: true,
      createdAt: '2022-06-28T15:30:52.657Z',
      updatedAt: '2022-06-28T16:25:54.248Z'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('products', null, {});
  }
};
