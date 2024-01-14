import express from 'express';
import asyncHandler from 'express-async-handler';
import productCtrl from '../controllers/product.controller.js'
const productRoutes = express.Router();
export default productRoutes;


productRoutes.route('/')
    .post(asyncHandler(productCtrl.insert))

productRoutes.route('/:Id')
    .get(asyncHandler(productCtrl.findbyId))
    .patch(asyncHandler(productCtrl.patch))
    .delete(asyncHandler(productCtrl.remove))

productRoutes.route('/filter')
    .post(asyncHandler(productCtrl.filter))