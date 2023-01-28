'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      // define association here
      this.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' })
    }
    toJSON() {
      return { ...this.get(), categoryId: undefined }
    }
  }
  Product.init({
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
    }
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
  });
  return Product;
};