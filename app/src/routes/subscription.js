const express = require('express');
const verifyIdToken =  require('../middlewares/firebase')
const subscriptionService = require('../middlewares/subscriptionService')
const subscriptionPlanService = require('../middlewares/subscriptionPlanService')
const walletService = require('../middlewares/walletService')
const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')
const ServerError = require('../errors/serverError')

const router = express.Router();

router.post('/:id', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const subscriptions = await subscriptionPlanService.getSubscriptions()

        const parsedSubscriptions = JSON.parse(JSON.stringify(subscriptions))
        let subscription_price = parsedSubscriptions.forEach(item => {
            if (item.title == req.body.subscription)
                return item.price
        })
        
        const depositBody = {
            "amount": subscription_price
        }

        // Falta logica de callback -> hay que pasar un endpoint para resolucion de pago
        walletService.deposit(uid, depositBody)

        // Despues si falla por callback se resuelve el tema de que fallo el pago en otro endpoint
        const response = await subscriptionService.createSubscription(req.body, req.params.id)

        res.status(201).send(response)
    } catch (e) {
        const body = {
            error: e.name,
            message: e.message
        }
        if (e instanceof ConnectionError) {
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            res.status(401).send(body)
        } else if (e instanceof ServerError) {
            res.status(e.status).send(body)
        } else {
            res.status(500).send(body)
        }
    }
})

router.patch('/:id', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await subscriptionService.patchSubscription(req.body, req.params.id)

        res.status(201).send(response)
    } catch (e) {
        const body = {
            error: e.name,
            message: e.message
        }
        if (e instanceof ConnectionError) {
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            res.status(401).send(body)
        } else if (e instanceof ServerError) {
            res.status(e.status).send(body)
        } else {
            res.status(500).send(body)
        }
    }
})

router.get('/:id', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await subscriptionService.getSubscription(req.params.id)

        res.status(200).send(response)
    } catch (e) {
        const body = {
            error: e.name,
            message: e.message
        }
        if (e instanceof ConnectionError) {
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            res.status(401).send(body)
        } else if (e instanceof ServerError) {
            res.status(e.status).send(body)
        } else {
            res.status(500).send(body)
        }
    }
})

module.exports = router;
