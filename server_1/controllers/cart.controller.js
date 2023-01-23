//Models
const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const { ProductImg } = require("../models/productImg.model");
const { ProductInCart } = require("../models/productInCart");

//Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.addProductToCart = catchAsync(async (req, res, next) => {
  const { currentUser } = req;
  const { productId, quantity } = req.body;

  const product = await Product.findOne({
    where: { status: "active", id: productId },
  });

  if (!product) {
    return next(new AppError(404, "Product not found."));
  }

  //Validate quantity
  if (quantity > product.quantity) {
    return next(
      new AppError(
        400,
        `This product only has ${product.quantity} units available.`
      )
    );
  }

  const cart = await Cart.findOne({
    where: { status: "active", userId: currentUser.id },
  });

  if (!cart) {
    //Assign cart to User
    const newCart = await Cart.create({ userId: currentUser.id });

    await ProductInCart.create({
      cartId: newCart.id,
      productId: product.id,
      quantity,
    });
  } else {
    // Cart already exist
    const productInCart = await ProductInCart.findOne({
      where: { productId: product.id, cartId: cart.id },
    });

    if (!productInCart) {
      // Add product to current cart
      await ProductInCart.create({
        cartId: cart.id,
        productId: product.id,
        quantity,
      });
    } else if (productInCart.status === "active") {
      if (productInCart.quantity + quantity > product.quantity) {
        return next(
          new AppError(
            400,
            `This product only has ${product.quantity} units available.`
          )
        );
      }

      await productInCart.update({
        quantity: productInCart.quantity + quantity,
      });
    } else if (productInCart.status === "removed") {
      await productInCart.update({ status: "active", quantity });
    }
  }

  res.status(200).json({
    status: "success",
  });
});

exports.getUserCart = catchAsync(async (req, res, next) => {
  const { currentUser } = req;

  const cart = await Cart.findOne({
    where: { status: "active", userId: currentUser.id },
    include: [
      {
        model: Product,
        include: { model: ProductImg },
        through: {
          where: { status: "active" },
        },
      },
    ],
  });

  if (!cart) {
    return next(new AppError(400, "This user do not have a cart active."));
  }

  res.status(200).json({
    status: "success",
    data: { cart },
  });
});

exports.updateProductInCart = catchAsync(async (req, res, next) => {
  const { currentUser } = req;
  const { productId, newQuantity } = req.body;

  const cart = await Cart.findOne({
    where: { status: "active", userId: currentUser.id },
  });

  if (!cart) {
    return next(new AppError(400, "This user do not have a cart active."));
  }

  // Validate that requested quantity does not exceed the available quantity
  const product = await Product.findOne({
    where: { id: productId },
    status: "active",
  });

  if (!product) {
    return next(new AppError(404, "Product not found."));
  } else if (newQuantity > product.quantity) {
    return next(
      new AppError(
        400,
        `This product only has ${product.quantity} units available.`
      )
    );
  } else if (newQuantity < 0) {
    return next(
      new AppError(400, "Cannot send negative values as new quantity.")
    );
  }

  //Validate that product is in the cart
  const productInCart = await ProductInCart.findOne({
    where: { cartId: cart.id, productId, status: "active" },
  });

  if (!productInCart) {
    return next(new AppError(404, "This product is not in the cart."));
  }

  //Remove product from cart in this case
  if (newQuantity === 0) {
    await productInCart.update({ quantity: 0, status: "removed" });
  } else {
    await productInCart.update({ quantity: newQuantity });
  }

  res.status(200).json({
    status: "success",
  });
});

exports.removeProductFromCart = catchAsync(async (req, res, next) => {
  const { currentUser } = req;
  const { id } = req.params;

  const cart = await Cart.findOne({
    where: { userId: currentUser.id, status: "active" },
  });

  if (!cart) {
    return next(new AppError(400, "This user does not have a cart active."));
  }

  const productInCart = await ProductInCart.findOne({
    where: { cartId: cart.id, productId: id, status: "active" },
  });

  if (!productInCart) {
    return next(new AppError(400, "This product is not in the cart."));
  }

  productInCart.update({ quantity: 0, status: "removed" });

  res.status(200).json({
    status: "success",
  });
});
