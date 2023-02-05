'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        len: [2,100]
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [2,200]
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        trim: true,
        allowNull: false,
        max: 32
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      sold: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shipping: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('products');
  }
};

