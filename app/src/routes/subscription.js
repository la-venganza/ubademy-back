const express = require('express');
const subscriptionService = require('../middlewares/subscriptionService');
const subscriptionPlanService = require('../middlewares/subscriptionPlanService');
const walletService = require('../middlewares/walletService');
const ConnectionError = require('../errors/connectionError');
const AuthError = require('../errors/authError');
const ServerError = require('../errors/serverError');

const router = express.Router();

router.post('/:id', async (req, res) => {
  try {
    const subscriptions = await subscriptionPlanService.getSubscriptions();

    let subscription_price = 0;
    if (subscriptions.data != '') {
      subscriptions.subscription_plans.forEach((item) => {
        if (item.title.toLowerCase() === req.body.subscription.toLowerCase()) { 
          subscription_price = item.price; }
      });
    }

    const depositBody = {
      amount: `${subscription_price}`,
    };

    // Falta logica de callback -> hay que pasar un endpoint para resolucion de pago
    // Por ser una red de test no estaria haciendo falta al parecer
    if (req.body.subscription.toLowerCase() != 'free' && req.body.subscription.toLowerCase() != '') {
      const SCresponse = await walletService.deposit(req.params.id, depositBody);

      console.log(req.body.subscription)

      if (SCresponse.status === 500) {
        throw new ServerError('Error', SCresponse.message, 500);
      }
    }

    // Despues si falla por callback se resuelve el tema de que fallo el pago en otro endpoint
    const response = await subscriptionService.createSubscription(req.body, req.params.id);

    res.status(201).send(response);
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

router.patch('/:id', async (req, res) => {
  try {
    const response = await subscriptionService.patchSubscription(req.body, req.params.id);

    res.status(201).send(response);
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
    const response = await subscriptionService.getSubscription(req.params.id);

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
