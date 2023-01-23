const express = require("express");
const { validateSession } = require("../middlewares/auth.middleware");
const router = express.Router();

const {
  addProductToCart,
  getUserCart,
  updateProductInCart,
  removeProductFromCart,
} = require("../controllers/cart.controller");

router.use(validateSession);

router.get("/", getUserCart);
router.post("/", addProductToCart);
router.patch("/", updateProductInCart);
router.delete("/:id", removeProductFromCart);

module.exports = { routerCart: router };
