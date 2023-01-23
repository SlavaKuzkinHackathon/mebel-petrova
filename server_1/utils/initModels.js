const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");
const { ProductImg } = require("../models/productImg.model");
const { Category } = require("../models/category.model");
const { Cart } = require("../models/cart.model");
const { ProductInCart } = require("../models/productInCart");
const { Purchase } = require("../models/purchase.model");
const { Brand } = require("../models/brand.model");

const initModels = () => {
  User.hasMany(Product);
  Product.belongsTo(User);

  Category.hasMany(Product);
  Product.belongsTo(Category);

  Brand.hasMany(Product);
  Product.belongsTo(Brand);

  Product.hasMany(ProductImg);
  ProductImg.belongsTo(Product);

  User.hasOne(Cart);
  Cart.belongsTo(User);

  Cart.belongsToMany(Product, { through: ProductInCart });
  Product.belongsToMany(Cart, { through: ProductInCart });

  User.hasMany(Purchase);
  Purchase.belongsTo(User);

  Cart.hasOne(Purchase);
  Purchase.belongsTo(Cart);
};

module.exports = { initModels };
