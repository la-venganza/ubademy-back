const express = require('express');
const verifyIdToken =  require('../middlewares/firebase')

const router = express.Router();

router.get('/:id', async function(req, res) {
    // Verifica que el token de firebase sea valido
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)


        // Pedir al back de python
        console.log(req.params.id);
        const body = {
            "first_name": "A name",
            "last_name": "A lastname",
            "email": "user@example.com",
            "role": "role",
            "is_admin": false,
            "age": 25,
            "subscription" :  "basic"
        }
        res.status(200).send(body)
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
    // Verificar request y mandar al back de python
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        let body = {id: 1}
        // Send to back
        res.status(201).send(body)
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

router.put('/:id', async function(req, res) {
    // Verificar request y mandar al back de python
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        // Send to back
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
