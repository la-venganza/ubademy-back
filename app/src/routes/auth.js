const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/', isLoggedIn, authController.doLogin);
router.get('/callback', isLoggedIn, authController.authCallback);
router.post('/logout', isLoggedIn, authController.logout);
router.get('/success', isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
});

module.exports = router;
