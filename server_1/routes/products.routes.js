const express = require("express");
const {
  getAllCategories,
  createCategory,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllBrands,
  createBrand,
  getAllRelatedProducts,
} = require("../controllers/products.controller");

//Middlewares
const {
  protectAdmin,
  validateSession,
} = require("../middlewares/auth.middleware");
const {
  productExists,
  productFilters,
} = require("../middlewares/products.middleware");

const { upload } = require("../utils/multer");

const router = express.Router();

router.get("/categories", getAllCategories);
router.get("/brands", getAllBrands);
router.get("/:id", productExists, getProductById);
router.get("/", productFilters, getAllProducts);
router.get("/related/:id", productExists, getAllRelatedProducts);

router.use(validateSession);
router.use(protectAdmin);
router.post("/categories", upload.single("thumbanailImg"), createCategory);
router.post("/brands", upload.single("thumbanailImg"), createBrand);
router.post("/", upload.array("productImg", 3), createProduct);

router.patch("/:id", productExists, updateProduct);
router.delete("/:id", productExists, deleteProduct);

module.exports = { routerProducts: router };
