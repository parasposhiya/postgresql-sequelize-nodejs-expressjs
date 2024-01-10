import express from 'express';
const router = express.Router();


import productRoutes from './product.route.js';
import subscriptionRoutes from './subscription.route.js';



/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);


router.use('/products', productRoutes);
router.use('/subscriptions', subscriptionRoutes);

export default router;