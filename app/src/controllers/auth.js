require('../middlewares/passport');
const passport = require('passport');

exports.doLogin = (req, res, next) => {
  const authenticator = passport.authenticate('google', {
    scope:
              ['email', 'profile'],
  });

  authenticator(req, res, next);
};

exports.authCallback = (req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  passport.authenticate('google', {
    failureRedirect: '/failed',
  }),
  (function (req, res) {
    const redirectUrl = req.session.redirect;
    console.log(`Redirecting to ${redirectUrl}`);
    // Successful authentication, redirect home.
    if (redirectUrl) {
      res.redirect(redirectUrl);
    } else {
      res.redirect('/auth/success');
    }
  }(req, res, next));
};

exports.logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};
