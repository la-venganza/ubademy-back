const { verifyIdToken } = require('./firebase');
const notTokenRoutesValidator = require('../utils/nonTokenRoutesValidator');

const tokenVerificationMiddleware = async (req, res, next) => {
  console.log(req.path);
  if (notTokenRoutesValidator(req.path)) return next();
  try {
    if (req.cookies.firebaseAuth) {
      req.uid = await verifyIdToken(req.cookies.firebaseAuth);
      return next();
    } if (req.headers['x-auth-token']) {
      req.uid = await verifyIdToken(req.headers['x-auth-token']);
      return next();
    }
  } catch (error) {
    console.log('Error while validating token against firebase', error);
    return res.status(401).send('Unable to validate provided token with firebase');
  }
  console.log('No auth token found in headers or cookies');
  return res.status(401).send('No auth token found');
};

module.exports = tokenVerificationMiddleware;
