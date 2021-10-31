const express = require('express');
const verifyIdToken =  require('../../firebase')
const getcookie = require('../middlewares/cookieHandler')

const router = express.Router();

router.get('/:id', async function(req, res) {
    // Verifica que el token de firebase sea valido
    try {
        let cookies = getcookie(req)
        let uid = await verifyIdToken(cookies[firebaseAuth])

        // Pedir al back de python
        console.log(req.params.id);
        body = {
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
        body = {
            error: e
        }
        res.status(400).send(body)
    }
});

router.post('/', async function(req, res) {
    // Verificar request y mandar al back de python
    try {
        let cookies = getcookie(req)
        let uid = await verifyIdToken(cookies[firebaseAuth])
        body = {id: 1}
        // Send to back
        res.status(201).send(body)
    } catch (e) {
        body = {
            error: e
        }
        res.status(400).send(body)
    }
});

router.put('/:id', async function(req, res) {
    // Verificar request y mandar al back de python
    try {
        let cookies = getcookie(req)
        let uid = await verifyIdToken(cookies[firebaseAuth])
        // Send to back
        res.status(202).send('PUT successful')
    } catch (e) {
        body = {
            error: e
        }
        res.status(400).send(body)
    }
});

module.exports = router;
