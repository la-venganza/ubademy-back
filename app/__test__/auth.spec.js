const authController = require('../src/controllers/auth');

describe('Auth controller', () => {
  describe('authCallback', () => {
    it('redirects', () => {
      const redirectMock = jest.fn();
      const sessionMock = { redirect: redirectMock };
      const req = { session: sessionMock };
      const res = { redirect: redirectMock };

      authController.authenticateCallback(req, res);
      expect(redirectMock).toHaveBeenCalled();
    });
  });
});
