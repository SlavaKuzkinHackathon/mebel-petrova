const { Sequelize, Op } = require("sequelize");

//Models
const { Brand } = require("../models/brand.model");
const { Category } = require("../models/category.model");
const { Product } = require("../models/product.model");
const { ProductImg } = require("../models/productImg.model");

//Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const productExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: { id, status: "active" },
    include: [
      { model: ProductImg, attributes: ["id", "imgUrl"] },
      { model: Category, attributes: ["name"] },
      { model: Brand, attributes: ["name"] },
    ],
  });

  if (!product) {
    return next(new AppError(404, "Product not found with given id."));
  }

  req.product = product;
  next();
});

const productFilters = catchAsync(async (req, res, next) => {
  const { category, brand, order, query } = req.query;

  const categoryFilter = {};
  if (category) categoryFilter.id = category;

  const brandFilter = {};
  if (brand) brandFilter.id = brand;

  const orderFilter = [];
  if (order) orderFilter.push(["price", order]);

  let queryFilter = {};
  if (query) {
    queryFilter = Sequelize.where(
      Sequelize.fn("lower", Sequelize.col("title")),
      {
        [Op.substring]: query.toLowerCase(),
      }
    );
  }

  req.categoryFilter = categoryFilter;
  req.brandFilter = brandFilter;
  req.orderFilter = orderFilter;
  req.queryFilter = queryFilter;

  next();
});

module.exports = { productExists, productFilters };
