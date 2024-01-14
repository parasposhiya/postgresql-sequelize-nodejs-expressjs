import express from 'express';
const indexRoutes = express.Router();


import productRoutes from './product.route.js';
import categoryRoutes from './category.route.js';

indexRoutes.use('/products', productRoutes);
indexRoutes.use('/categories', categoryRoutes);

export default indexRoutes;