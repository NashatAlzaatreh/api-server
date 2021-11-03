"use strict";

const express = require("express");
require("dotenv").config();

const app = express();

const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const validator = require("./middleware/validator");
const logger = require("./middleware/logger");
const foodRouter = require("./routes/food.route");
const clothesRouter = require("./routes/clothes.route");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to express home! 🏡 ");
});

app.get("/person", validator, (req, res) => {
  const { name } = req.query;
  res.status(200).json({ name: name });
});
// global middleware
app.use(logger);
app.use(express.json());

// to make our food routers usable, use the food route with express
app.use(foodRouter);
app.use(clothesRouter); // use the lothes routes

// this is a global middleware
app.use("*", notFoundHandler);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}

module.exports = {
  app,
  start,
};
