const express = require('express');
const verifyIdToken =  require('../middlewares/firebase')
const requestHandler = require('../middlewares/requestHandler')
const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')

const router = express.Router();

router.get('/:email', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)
        
        // Pedir al back de python
        const response = await requestHandler.getUserByEmail(req.params.email)
        res.status(200).send(response)
    } catch (e) {
        let body = {}
        if (e instanceof ConnectionError) {
            body = {
                error: e.name,
                message: e.message
            }
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            body = {
                error: e.name,
                message: e.message
            }
            res.status(401).send(body)
        } else {
            body = {
                error: e.name,
                message: e.message
            }
            res.status(500).send(body)
        }
    }
});

router.post('/', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        response = await requestHandler.createUser(req.body)
        res.status(201).send(response)
    } catch (e) {
        let body = {}
        if (e instanceof ConnectionError) {
            body = {
                error: e.name,
                message: e.message
            }
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            body = {
                error: e.name,
                message: e.message
            }
            res.status(401).send(body)
        } else {
            body = {
                error: e.name,
                message: e.message
            }
            res.status(500).send(body)
        }
    }
});

router.put('/', async function(req, res) {
    // Verificar request y mandar al back de python
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        response = await requestHandler.createUser(req.body)
        res.status(202).send('PUT successful')
    } catch (e) {
        let body = {}
        if (e instanceof ConnectionError) {
            body = {
                error: e.name,
                message: e.message
            }
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            body = {
                error: e.name,
                message: e.message
            }
            res.status(401).send(body)
        } else {
            body = {
                error: e.name,
                message: e.message
            }
            res.status(500).send(body)
        }
    }
});

module.exports = router;
