const express = require("express");
const {
  createUser,
  loginUser,
  getUser,
  updateUser,
} = require("../controllers/users.controller");

const router = express.Router();

//Middlewares
const {
  createUserValidations,
  checkValidations,
} = require("../middlewares/validations.middlewares");
const { validateSession } = require("../middlewares/auth.middleware");

router.post("/", createUserValidations, checkValidations, createUser);
router.post("/login", loginUser);

router.use(validateSession);
router.get("/profile", getUser);
router.patch("/profile", updateUser);

module.exports = { routerUsers: router };
