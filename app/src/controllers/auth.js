require('../middlewares/passport');
const passport = require('passport');
const axios = require('axios');

exports.doLogin = (req, res, next) => {
  const authenticator = passport.authenticate('google', {
    scope:
              ['email', 'profile'],
  });

  authenticator(req, res, next);
};

exports.authenticateCallback = (req, res) => {
  console.log(req.user);
  const redirectUrl = req.session.redirect;
  if (redirectUrl) {
    console.log(`Redirecting to ${redirectUrl}`);
    // Successful authentication, redirect home.
    res.redirect(redirectUrl);
  } else {
    res.redirect('/auth/success');
  }
};

exports.logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};
