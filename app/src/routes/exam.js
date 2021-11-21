const express = require('express');
const verifyIdToken =  require('../middlewares/firebase')
const examService = require('../middlewares/examService')

const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')
const ServerError = require('../errors/serverError')

const router = express.Router();

router.post('/', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await examService.createExam(req.body)

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

router.patch('/', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await examService.patchExam(req.body)

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
            res.status(e.status).send(body)
        } else {
            res.status(500).send(body)
        }
    }
})

router.get('/', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await examService.getExam(req.body)

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
