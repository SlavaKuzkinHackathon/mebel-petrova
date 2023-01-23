const express = require("express");
const cors = require("cors");

//Controllers
const { globalErrorHandler } = require("./controllers/error.controller");

//Routes
const { routerUsers } = require("./routes/users.routes");
const { routerProducts } = require("./routes/products.routes");
const { routerCart } = require("./routes/cart.routes");
const { routerPurchases } = require("./routes/purchases.routes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Endpoints
app.use("/api/v1/users", routerUsers);
app.use("/api/v1/products", routerProducts);
app.use("/api/v1/cart", routerCart);
app.use("/api/v1/purchases", routerPurchases);

app.use(globalErrorHandler);

module.exports = { app };
