require('../middlewares/passport');
const passport = require('passport');
const axios = require('axios');

const postUser = (user) => {
  console.log(`Registering ${user.displayName}`);
  axios({
    method: 'post',
    url: `${process.env.BACK_PY}/api/v1/users/`,
    data: {
      first_name: user.name.givenName,
      last_name: user.name.familyName,
      email: user.emails[0].value,
      is_admin: false,
    },
  }).then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });
};

exports.doLogin = (req, res, next) => {
  const authenticator = passport.authenticate('google', {
    scope:
              ['email', 'profile'],
  });

  authenticator(req, res, next);
};

exports.authenticateCallback = (req, res) => {
  const redirectUrl = req.session.redirect;
  if (redirectUrl) {
    console.log(`Redirecting to ${redirectUrl}`);
    // Successful authentication, redirect home.
    postUser(req.user);
    res.redirect(redirectUrl);
  } else {
    postUser(req.user);
    res.redirect('/auth/success');
  }
};

exports.logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};
