const express = require('express');
const verifyIdToken = require('../middlewares/firebase');
const subscriptionPlanService = require('../middlewares/subscriptionPlanService');
const ConnectionError = require('../errors/connectionError');
const AuthError = require('../errors/authError');
const ServerError = require('../errors/serverError');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await subscriptionPlanService.getSubscriptions();

    res.status(200).send(response);
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

router.get('/:id', async (req, res) => {
  try {
    const response = await subscriptionPlanService.getSubscriptionPlan(req.params.id);

    res.status(200).send(response);
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
