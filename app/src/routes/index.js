const express = require('express');
const course = require('./course');
const user = require('./user');
const exam = require('./exam');
const subscription = require('./subscription');
const subscription_plans = require('./subscription_plans');
const metrics = require('./metrics');
const wallet = require('./wallet');
const tokenVerificationMiddleware = require('../middlewares/tokenVerification');

const router = express.Router();
router.use(tokenVerificationMiddleware);
// Health check routes
router.get('/', (_req, res) => {
  res.json({ message: 'You are not logged in' });
});

router.get('/failed', (_req, res) => {
  res.send('Failed');
});

router.get('/ping', (_req, res) => {
  res.status(200).send('Ping\n');
});

// Routes mapping

router.use('/course', course);
router.use('/user', user);
router.use('/exam', exam);
router.use('/subscription', subscription);
router.use('/subscription_plans', subscription_plans);
router.use('/wallet', wallet);
router.use('/metrics', metrics);

module.exports = router;
