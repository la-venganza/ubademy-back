const express = require('express');
require('../middlewares/passport');
const isLoggedIn = require('../middlewares/isLoggedIn');
const setRedirect = require('../middlewares/setRedirect');
const authController = require('../controllers/auth');
const passport = require('passport');
const router = express.Router();

router.get('/', setRedirect, authController.doLogin);

router.get('/callback',
  // eslint-disable-next-line no-unused-expressions
  passport.authenticate('google', { failureRedirect: '/failed' }),
  authController.authenticateCallback);

router.get('/logout', isLoggedIn, authController.logout);
router.get('/success', isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
});

module.exports = router;
