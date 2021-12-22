const express = require('express');
const { listAllUsers } = require('../middlewares/firebase');
const ConnectionError = require('../errors/connectionError');
const AuthError = require('../errors/authError');
const ServerError = require('../errors/serverError');
const {
  getGoogleLoginMetrics,
  getPasswordLoginMetrics, incrementRecoveryMetrics, getAccountRecoveryMetrics,
} = require('../middlewares/firebase');

const router = express.Router();

router.get('/users/', async (req, res) => {
  try {
    // Start listing users from the beginning, 1000 at a time.
    const response = await listAllUsers().then(async (allUsers) => {
      const googleUsers = allUsers ? allUsers[0].users
        .filter((user) => user.providerData[0].providerId === 'google.com') : [];
      const countAll = allUsers ? allUsers[0].users.length : 0;
      // const federatedLoginMetrics = await getGoogleLoginMetrics();
      // const passwordLoginMetrics = await getPasswordLoginMetrics();
      // const recoveryMetrics = await getAccountRecoveryMetrics();
      const firebaseMetrics = await Promise.all([
        getGoogleLoginMetrics(), getPasswordLoginMetrics(), getAccountRecoveryMetrics()]);
      console.log(firebaseMetrics);
      return {
        totalUsers: countAll,
        googleUsers: googleUsers.length,
        passwordUsers: countAll - googleUsers.length,
        federatedLoginMetrics: firebaseMetrics[0],
        passwordLoginMetrics: firebaseMetrics[1],
        recoveryMetrics: firebaseMetrics[2],
      };
    });
    return res.status(200).send(response);
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

router.patch('/password-recovery', async (req, res) => {
  try {
    const response = await incrementRecoveryMetrics();
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
