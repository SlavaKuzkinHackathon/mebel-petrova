const { sequelize, DataTypes } = require("../utils/database");

const ProductImg = sequelize.define("productImg", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { ProductImg };
