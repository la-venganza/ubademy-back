const passport = require('passport');

exports.post = (req, res) => passport.authenticate('google', {
  scope:
            ['email', 'profile'],
});

exports.authCallback = (req, res) => {
  res.redirect('/success');
};

exports.logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};
