const express = require("express");

const {
  getUserPurchases,
  getUserPurchaseById,
  purchaseCart,
} = require("../controllers/purchases.controller");
const { validateSession } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(validateSession);

router.post("/", purchaseCart);
router.get("/", getUserPurchases);
router.get("/:id", getUserPurchaseById);

module.exports = { routerPurchases: router };
