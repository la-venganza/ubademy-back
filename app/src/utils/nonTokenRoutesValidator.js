const whiteListedRoutes = ['/metrics/password-recovery'];
const notTokenRoutesValidator = (route) => whiteListedRoutes.some((whiteListedRoute) => whiteListedRoute === route);

module.exports = notTokenRoutesValidator;
