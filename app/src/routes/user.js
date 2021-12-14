const express = require('express');
const verifyIdToken =  require('../middlewares/firebase')
const userService = require('../middlewares/userService')
const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')
const ServerError = require('../errors/serverError')

const router = express.Router();

router.get('/:id', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)
        
        const response = await userService.getUserById(req.params.id, req.query)
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
});

router.get('/login/:email', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)
        
        // Pedir al back de python
        let response = await userService.getUserByEmail(req.params.email)

        if (req.query.properties) {
            parsedResponse = JSON.parse(JSON.stringify(response))
            response = await userService.getUserById(parsedResponse.results[0].user_id, req.query)
        }

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
});

router.get('/admin/:email', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)
        
        // Pedir al back de python
        let response = await userService.getAdminByEmail(req.params.email)

        parsedResponse = JSON.parse(JSON.stringify(response))
        if (!parsedResponse.results[0].is_admin) {
            throw new AuthError(Error, "You are not an admin user", 401)
        }

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
            res.status(e.status).send(body)
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
});

module.exports = router;
