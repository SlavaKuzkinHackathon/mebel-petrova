//Models
const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const { ProductImg } = require("../models/productImg.model");
const { Purchase } = require("../models/purchase.model");

//Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.purchaseCart = catchAsync(async (req, res, next) => {
  const { currentUser } = req;

  const cart = await Cart.findOne({
    where: { status: "active", userId: currentUser.id },
    include: [
      {
        model: Product,
        through: {
          where: { status: "active" },
        },
      },
    ],
  });

  if (!cart) {
    return next(new AppError(400, "This user does not have a cart active."));
  }

  if (!cart.products.length) {
    return next(new AppError(400, "This cart does not have products added."));
  }

  let totalPrice = 0;

  const promisesArray = cart.products.map(async (product) => {
    //Update product to status purchased
    await product.productInCart.update({ status: "purchased" });

    //Calculate total price
    const productTotalPrice = product.productInCart.quantity * product.price;

    totalPrice += productTotalPrice;

    //Substract to currernt product quantity
    const newQuantity = product.quantity - product.productInCart.quantity;

    await product.update({ quantity: newQuantity });
  });

  await Promise.all(promisesArray);

  await cart.update({ status: "purchased" });

  const newPurchase = await Purchase.create({
    cartId: cart.id,
    userId: currentUser.id,
    totalPrice,
  });

  res.status(201).json({
    status: "success",
    data: { newPurchase },
  });
});

exports.getUserPurchases = catchAsync(async (req, res, next) => {
  const { currentUser } = req;

  const purchases = await Purchase.findAll({
    where: { userId: currentUser.id },
    include: {
      model: Cart,
      include: {
        model: Product,
        include: { model: ProductImg },
        through: {
          where: { status: "purchased" },
        },
      },
    },
  });

  if (!purchases) {
    return next(new AppError(400, "This user does not have purchases."));
  }

  res.status(200).json({
    status: "success",
    data: { purchases },
  });
});

exports.getUserPurchaseById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  const purchase = await Purchase.findOne({
    where: { id, userId: currentUser.id },
    include: {
      model: Cart,
      include: { model: Product, include: { model: ProductImg } },
    },
  });

  if (!purchase) {
    return next(
      new AppError(400, "This user does not have a purchase with given id.")
    );
  }

  res.status(200).json({
    status: "success",
    data: { purchase },
  });
});
