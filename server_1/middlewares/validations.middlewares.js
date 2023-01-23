const { body, validationResult } = require("express-validator");

//Utils
const { AppError } = require("../utils/appError");

const createUserValidations = [
  body("firstName").notEmpty().withMessage("First name cannot be empty"),
  body("lastName").notEmpty().withMessage("Last name cannot be empty"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("phone").notEmpty().withMessage("Phone cannot be empty"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    const errorMsg = messages.join(". ");

    return next(new AppError(400, errorMsg));
  }

  next();
};

module.exports = { createUserValidations, checkValidations };
