const express = require('express');
const course = require('./course');
const user = require('./user')
const exam = require('./exam')
const suscription = require('./suscription')
const wallet = require('./wallet')

const router = express.Router();

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
router.use('/user', user)
router.use('/exam', exam)
router.use('/suscription', suscription)
router.use('/wallet', wallet)

module.exports = router;
