const { sequelize, DataTypes } = require("../utils/database");

const Brand = sequelize.define("brand", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});

module.exports = { Brand };
