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

// who needs a cookie parser
const parseCookie = (str) => str
  .split(';')
  .map((v) => v.split('='))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});

exports.authenticateCallback = (req, res) => {
  const redirectUrl = req.session.redirect;

  let userJWT = 'none';
  if (req.user) {
    postUser(req.user);
    // eslint-disable-next-line no-underscore-dangle
    if (req.session._ctx) {
      // eslint-disable-next-line no-underscore-dangle
      userJWT = parseCookie(req.session._ctx.headers.cookie)[req.session._ctx.sessionKey];
    }
  }

  // eslint-disable-next-line no-underscore-dangle

  if (redirectUrl) {
    console.log(`Redirecting to ${redirectUrl}`);
    // Successful authentication, redirect home.

    // warning!! jwt dangerously set in query string!
    res.redirect(`${redirectUrl}?name=${req.user.name.givenName}&jwt=${userJWT}`);
  } else {
    res.redirect('/auth/success');
  }
};

exports.logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};
