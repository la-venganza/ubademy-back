const passport = require('passport');

exports.doLogin = (req, res) => passport.authenticate('google', {
  scope:
            ['email', 'profile'],
});

exports.authCallback = (req, res) => {
  // TODO: Here we should implement login check and callback to app
  res.redirect('/success');
};

exports.logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};
