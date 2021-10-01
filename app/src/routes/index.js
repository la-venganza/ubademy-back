const express = require('express');
const auth = require('./auth');

const router = express.Router();

// Health check routes
router.get('/', (req, res) => {
  res.json({ message: 'You are not logged in' });
});

router.get('/failed', (req, res) => {
  res.send('Failed');
});

router.get('/ping', (_req, res) => {
  res.status(200).send('Ping\n');
});

// Routes mapping

router.use('/auth', auth);
