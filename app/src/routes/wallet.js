const express = require('express');
const walletService = require('../middlewares/walletService')
const verifyIdToken =  require('../middlewares/firebase')
const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')
const ServerError = require('../errors/serverError')

const router = express.Router();

router.get('/balance', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await walletService.getBalance(uid)

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

router.post('/deposit', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await walletService.deposit(uid, body)

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

router.get('/', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await walletService.getWallet(uid)

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

router.post('/', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await walletService.createWallet(uid)

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

router.get('/teacherBalance/:email', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await walletService.getTeacherBalance(uid)

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

router.post('/payTeacher', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        // Falta resolver el tema de conseguir el teacher ID

        const response = await walletService.payTeacher()

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

router.post('/teacherWithdraw', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await walletService.teacherWithdraw(uid, req.body)

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

router.get('/admin/balance', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await walletService.getOwnerBalance()

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

router.get('/admin/withdraw', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await walletService.ownerWithdraw(req.body)

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
