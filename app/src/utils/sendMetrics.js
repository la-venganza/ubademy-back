const { incrementGoogleLogin, incrementPasswordLogin } = require('../middlewares/firebase');

const sendLoginMetrics = async (loginType) => {
  if (loginType === 'google') {
    await incrementGoogleLogin();
  } else if (loginType === 'mail') {
    await incrementPasswordLogin();
  }
};

module.exports = { sendLoginMetrics };
