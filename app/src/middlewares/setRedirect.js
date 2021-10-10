module.exports = (req, res, next) => {
  req.session.redirect = req.query.redirect;
  return next();
};
