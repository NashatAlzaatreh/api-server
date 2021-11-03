"use strict";

require("dotenv").config();

// Connects to our database depending on the URI as an environmental variable
const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

// require both the Sequelize and Datatype  constructor from the sequelize package
const { Sequelize, DataTypes } = require("sequelize");

// We will configure our connection options for production

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

// our connection object
// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const food = require("./food.model");
const clothes = require("./clothes.model");

const foodModel = food(sequelize, DataTypes);
const clothesModel = clothes(sequelize, DataTypes);

foodModel.hasMany(clothesModel, { foreignKey: "foodId", sourceKey: "id" });
clothesModel.belongsTo(foodModel, { foreignKey: "foodId", targetKey: "id" });

const Collection = require("./collection-class");

const foodCollection = new Collection(foodModel);
const clothesCollection = new Collection(clothesModel);

module.exports = {
  db: sequelize,
  foodCollection: foodCollection,
  clothesCollection: clothesCollection,
};
