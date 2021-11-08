const express = require('express');
const verifyIdToken =  require('../middlewares/firebase')
const courseService = require('../middlewares/courseService')
const courseMapper = require('../utils/requestMapper')

const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')
const ServerError = require('../errors/serverError')

const router = express.Router();

router.get('/', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await courseService.getCourses()

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

router.get('/:id', async function(req, res) {
    // Verifica que el token de firebase sea valido
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        // Pedir al back de python
        const originalBody = {
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

        const newBody = {
            "user_id":"9b8fcc59-3298-4ab2-8f33-4b3b74053123",
            "title":"Titulo",
            "description":"Descripcion re copada",
            "type": "type test",
            "hashtags": "hasthags",
            "location": "internet",
            "lessons":[
               {
                  "position":0,
                  "active":true,
                  "required":false,
                  "multimedia_id":"idhasheado12yt",
                  "title":"Stage 0 Title",
                  "multimedia_type":"Tipo",
                  "sequence_number": 0,
                  "require": true
         
               },
               {
                  "position":1,
                  "active":true,
                  "required":true,
                  "multimedia_id":"otrohash?",
                  "title":"Stage 1 Title",
                  "multimedia_type":"Otro tipo",
                  "sequence_number": 0,
                  "require": true
         
         
               }
            ]
         }
        const response = await courseService.getCourseById(req.params.id)

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
    // Verificar request y mandar al back de python
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const body = courseMapper(req.body)

        const response = await courseService.createCourse(body)

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

        const body = courseMapper(req.body)
        
        const response = await courseService.updateCourse(req.params.id, body)

        // Send to back
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
});

module.exports = router;
