const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const setRedirect = require('../middlewares/setRedirect');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', setRedirect, authController.doLogin);
router.get('/callback', authController.authCallback);
router.get('/logout', isLoggedIn, authController.logout);
router.get('/success', isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
});

module.exports = router;
