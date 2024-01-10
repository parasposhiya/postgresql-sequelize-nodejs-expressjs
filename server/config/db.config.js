import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const { PQSQLDATABASE, PQSQLUSER, PQSQLPASSWORD, PQSQLHOST, PQSQLDIALECT } = process.env;

// All Models
import productModel from "../models/product.model.js";
import subscriptionModel from "../models/subscription.model.js";

const PGDB = new Sequelize(
    PQSQLDATABASE,
    PQSQLUSER,
    PQSQLPASSWORD,
    {
        host: PQSQLHOST,
        dialect: PQSQLDIALECT,
        operatorsAliases: 0,
        timezone: 'utc',
        logging: false,        
    }
);

const MODELS = {
    Product: productModel(PGDB, Sequelize),
    Subscription: subscriptionModel(PGDB, Sequelize),
  };
  
  Object.keys(models).forEach((key) => {
    if ('associate' in MODELS[key]) {
      MODELS[key].associate(MODELS);
    }
  });

export { PGDB };

export default MODELS;
