// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')

async function getSuscription (body, user_id) {
    try {
        const res = await instance.get('/api/v1/' + user_id + '/suscriptions/')

        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function createSuscription (user_id) {
    try {
        // Falta la logica con el smart contract - por ahora lo dejamos directo
        
        const res = await instance.post('/api/v1/' + user_id + '/suscriptions/')

        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function patchSuscription (body, user_id) {
    try {
        // Falta la logica con el smart contract - por ahora lo dejamos directo
        const mappedBody = {
            "active": body.active,
            "end_date": body.end_date
        }

        const res = await instance.patch('/api/v1/' + user_id + '/suscriptions/' + body.suscription_name, mappedBody)

        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = { createSuscription, getSuscription, patchSuscription}