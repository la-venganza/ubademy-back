const authController = require('../src/controllers/auth');

describe('Auth controller', () => {
  describe('authCallback', () => {
    it('redirects', () => {
      const redirectMock = jest.fn();
      const res = { redirect: redirectMock };
      authController.authCallback({}, res);
      expect(redirectMock).toHaveBeenCalled();
    });
  });
});
