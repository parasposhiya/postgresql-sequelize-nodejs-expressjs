import express from 'express';
import asyncHandler from 'express-async-handler';
import productCtrl from '../controllers/product.controller.js'
const router = express.Router();
export default router;


router.route('/')
    .post(asyncHandler(productCtrl.insert))

router.route('/:Id')
    .get(asyncHandler(productCtrl.findbyId))
    .patch(asyncHandler(productCtrl.patch))
    .delete(asyncHandler(productCtrl.remove))

router.route('/filter')
    .post(asyncHandler(productCtrl.filter))