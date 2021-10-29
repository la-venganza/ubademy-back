const express = require('express');
const auth = require('./auth');

const router = express.Router();

router.get('/:id', function(req, res) {
    // Pedir al back de python
    // Hay que hacer un try catch para que quede prolijo
    console.log(req.params.id);
    body = {
        id: 1,
        title: 'Titulo',
        description: 'Descripcion re copada',
        stages: [
            {
                position: 0,
                active: true,
                required: false,
                multimedia_id: 'idhasheado12yt',
                title: 'Stage 0 Title',
                multimedia_type: 'Tipo',
            },
            {
                position: 1,
                active: true,
                required: true,
                multimedia_id: 'otrohash?',
                title: 'Stage 1 Title',
                multimedia_type: 'Otro tipo',
            }
        ]
    }
    res.status(200).send(body) 
});

router.post('/', function(req, res) {
    // Verificar request y mandar al back de python
    // Hay que hacer un try catch para que quede prolijo
    body = {id: 1}
    res.status(201).send(body)
});

router.put('/:id', function(req, res) {
    // Verificar request y mandar al back de python
    // Hay que hacer un try catch para que quede prolijo
    res.status(202).send('PUT successful')
});

module.exports = router;
