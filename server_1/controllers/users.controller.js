const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//Models
const { User } = require("../models/user.model");

//Utils
const { catchAsync } = require("../utils/catchAsync");
const { filterAllowedFields } = require("../utils/filterAllowedFields");
const { AppError } = require("../utils/appError");

dotenv.config({ path: "./.env" });

exports.createUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "sucess",
    data: {
      newUser,
    },
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: "active" },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(401, "Invalid credentials."));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { currentUser } = req;

  currentUser.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user: currentUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { currentUser } = req;
  const { currentPassword, newPassword } = req.body;

  const data = filterAllowedFields(req.body, "firstName", "lastName", "phone");

  if (currentPassword && newPassword) {
    if (!(await bcrypt.compare(currentPassword, currentUser.password))) {
      return next(new AppError(401, "The current password is not valid."));
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    data.password = hashedPassword;
  }

  await currentUser.update(data);

  res.status(204).json({ status: "success" });
});
