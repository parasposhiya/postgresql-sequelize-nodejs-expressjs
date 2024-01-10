import express from 'express';
import asyncHandler from 'express-async-handler';
import subscritionCtrl from '../controllers/subscrition.controller.js'
const router = express.Router();
export default router;


router.route('/')
    .post(asyncHandler(subscritionCtrl.insert))

router.route('/:Id')
    .get(asyncHandler(subscritionCtrl.findbyId))
    .patch(asyncHandler(subscritionCtrl.patch))
    .delete(asyncHandler(subscritionCtrl.remove))

router.route('/filter')
    .post(asyncHandler(subscritionCtrl.filter))