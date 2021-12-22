const express = require('express');
const { verifyIdToken, listAllUsers } = require('../middlewares/firebase');
const subscriptionPlanService = require('../middlewares/subscriptionPlanService');
const ConnectionError = require('../errors/connectionError');
const AuthError = require('../errors/authError');
const ServerError = require('../errors/serverError');

const router = express.Router();

router.get('/users/', async (req, res) => {
  try {
    // Start listing users from the beginning, 1000 at a time.
    const res = listAllUsers().then((allUsers) => {
      const googleUsers = allUsers[0].users.filter((user) => user.providerData[0].providerId === 'google.com');
      return {
        totalUsers: allUsers[0].users.length,
        googleUsers: googleUsers.length,
        passwordUsers: allUsers[0].users.length - googleUsers.length,
      };
    });
  } catch (e) {
    const body = {
      error: e.name,
      message: e.message,
    };
    if (e instanceof ConnectionError) {
      res.status(500).send(body);
    } else if (e instanceof AuthError) {
      res.status(401).send(body);
    } else if (e instanceof ServerError) {
      res.status(e.status).send(body);
    } else {
      res.status(500).send(body);
    }
  }
});

module.exports = router;
