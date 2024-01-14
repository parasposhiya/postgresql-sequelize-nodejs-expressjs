import { Sequelize } from "sequelize";
// import dotenv from 'dotenv';
// dotenv.config();

const { PQSQLDATABASE, PQSQLUSER, PQSQLPASSWORD, PQSQLHOST, PQSQLPORT, PQSQLDIALECT} = process.env;

// All Models
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

const PGDB = new Sequelize(
    PQSQLDATABASE,
    PQSQLUSER,
    PQSQLPASSWORD,
    {
        host: PQSQLHOST,
        port: PQSQLPORT,
        dialect: PQSQLDIALECT,
        operatorsAliases: 0,
        timezone: 'utc',
        logging: false,       
    }
);

const MODELS = {
    Product: productModel(PGDB, Sequelize),
    Category: categoryModel(PGDB, Sequelize),
  };
  
  Object.keys(MODELS).forEach((key) => {
    if ('associate' in MODELS[key]) {
      MODELS[key].associate(MODELS);
    }
  });

export { PGDB };

export default MODELS;
