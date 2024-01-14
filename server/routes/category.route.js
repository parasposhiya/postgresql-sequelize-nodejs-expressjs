import express from 'express';
import asyncHandler from 'express-async-handler';
import categoryCtrl from '../controllers/category.controller.js'
const categoryRoutes = express.Router();

export default categoryRoutes;

categoryRoutes.route('/')
    .post(asyncHandler(categoryCtrl.insert))

categoryRoutes.route('/:Id')
    .get(asyncHandler(categoryCtrl.findbyId))
    .patch(asyncHandler(categoryCtrl.patch))
    .delete(asyncHandler(categoryCtrl.remove))

categoryRoutes.route('/filter')
    .post(asyncHandler(categoryCtrl.filter))