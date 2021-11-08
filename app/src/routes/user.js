const express = require('express');
const verifyIdToken =  require('../middlewares/firebase')
const userService = require('../middlewares/userService')
const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')
const ServerError = require('../errors/serverError')

const router = express.Router();

router.get('/:email', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)
        
        // Pedir al back de python
        const response = await userService.getUserByEmail(req.params.email)
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
            res.status(400).send(body)
        } else {
            res.status(500).send(body)
        }
    }
});

router.post('/', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        response = await userService.createUser(req.body)
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
            res.status(400).send(body)
        } else {
            res.status(500).send(body)
        }
    }
});

router.put('/:id', async function(req, res) {
    // Verificar request y mandar al back de python
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        response = await userService.updateUser(req.params.id,req.body)
        res.status(202).send(response)
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
            res.status(400).send(body)
        } else {
            res.status(500).send(body)
        }
    }
});

module.exports = router;
