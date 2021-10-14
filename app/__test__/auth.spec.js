const authController = require('../src/controllers/auth');
const axios = require('axios');

jest.mock('axios', () => jest.fn(() => Promise.resolve('teresa teng')));

describe('Auth controller', () => {
  describe('authCallback', () => {
    it('redirects', () => {
      const redirectMock = jest.fn();
      const user = {
        displayName: 'Luciana',
        name: {
          givenName: 'L',
          familyName: 'S',
        },
        emails: [{ value: 'asdfads' }],
      };
      const sessionMock = { redirect: redirectMock };
      const req = {
        session: sessionMock,
        user,
        _ctx: {
          sessionKey: 'test',
          headers: {
            cookie: 'test=lala',
          },
        },
      };
      const res = { redirect: redirectMock };

      authController.authenticateCallback(req, res);
      expect(redirectMock).toHaveBeenCalled();
    });
  });
});
