const express = require('express');
const verifyIdToken =  require('../middlewares/firebase')
const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')

const router = express.Router();

router.get('/:id', async function(req, res) {
    // Verifica que el token de firebase sea valido
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        // Pedir al back de python
        const body = {
            "id": 1,
            "creator_id": 1,
            "title": 'Titulo',
            "description": 'Descripcion re copada',
            "stages": [
                {
                    "position": 0,
                    "active": true,
                    "required": false,
                    "multimedia_id": 'idhasheado12yt',
                    "title": 'Stage 0 Title',
                    "multimedia_type": 'Tipo',
                },
                {
                    "position": 1,
                    "active": true,
                    "required": true,
                    "multimedia_id": 'otrohash?',
                    "title": 'Stage 1 Title',
                    "multimedia_type": 'Otro tipo',
                }
            ]
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

        body = {id: 1}
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
