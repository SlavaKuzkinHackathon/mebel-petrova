const { Op } = require("sequelize");

//Models
const { Brand } = require("../models/brand.model");
const { Category } = require("../models/category.model");
const { Product } = require("../models/product.model");
const { ProductImg } = require("../models/productImg.model");

//Utils
const { catchAsync } = require("../utils/catchAsync");
const { uploadToCloudinary } = require("../utils/cloudinary");
const { filterAllowedFields } = require("../utils/filterAllowedFields");

// CATEGORIES
exports.createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const result = await uploadToCloudinary(req.file, "categories");

  const newCategory = await Category.create({
    name,
    thumbnailUrl: result.secure_url,
  });

  res.status(201).json({
    status: "success",
    data: { newCategory },
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({
    where: { status: "active" },
    include: { model: Product },
  });

  res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
});

//BRANDS
exports.createBrand = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const result = await uploadToCloudinary(req.file, "brands");

  const newBrand = await Brand.create({
    name,
    thumbnailUrl: result.secure_url,
  });

  res.status(201).json({
    status: "success",
    data: { newBrand },
  });
});

exports.getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await Brand.findAll({
    where: { status: "active" },
    include: { model: Product },
  });
  // where: { status: "active" } });

  res.status(200).json({
    status: "success",
    data: {
      brands,
    },
  });
});

//PRODUCTS
exports.createProduct = catchAsync(async (req, res, next) => {
  const { currentUser, files } = req;
  const { title, description, quantity, price, categoryId, brandId } = req.body;

  const newProduct = await Product.create({
    title,
    description,
    quantity,
    price,
    userId: currentUser.id,
    categoryId,
    brandId,
  });

  const filesPromesis = files.map(async (file) => {
    const result = await uploadToCloudinary(file, "products");

    await ProductImg.create({
      imgUrl: result.secure_url,
      productId: newProduct.id,
    });
  });

  await Promise.all(filesPromesis);

  res.status(201).json({
    status: "success",
    data: {
      newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const { categoryFilter, brandFilter, orderFilter, queryFilter } = req;

  const products = await Product.findAll({
    order: orderFilter,
    where: {
      [Op.and]: [{ status: "active" }, queryFilter],
    },
    include: [
      { model: ProductImg, attributes: ["id", "imgUrl"] },
      { model: Category, where: categoryFilter, attributes: ["name"] },
      { model: Brand, where: brandFilter, attributes: ["name"] },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

exports.getAllRelatedProducts = catchAsync(async (req, res, next) => {
  const { id, categoryId, brandId } = req.product;

  const products = await Product.findAll({
    where: {
      status: "active",
      [Op.not]: [{ id }],
      [Op.or]: [{ categoryId }, { brandId }],
    },
    include: [
      { model: ProductImg, attributes: ["id", "imgUrl"] },
      {
        model: Category,
        attributes: ["name"],
      },
      { model: Brand, attributes: ["name"] },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const { product } = req;

  const data = filterAllowedFields(
    req.body,
    "title",
    "description",
    "quantity",
    "price"
  );

  await product.update(data);

  res.status(200).json({
    status: "success",
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const { product } = req;

  await product.update({ status: "removed" });

  res.status(200).json({ status: "success" });
});
