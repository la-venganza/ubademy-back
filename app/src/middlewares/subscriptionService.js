// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')

async function getSubscription (body, user_id) {
    try {
        const res = await instance.get('/api/v1/' + user_id + '/subscriptions/')

        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function createSubscription (user_id) {
    try {
        // Falta la logica con el smart contract - por ahora lo dejamos directo
        
        const res = await instance.post('/api/v1/' + user_id + '/subscriptions/')

        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function patchSubscription (body, user_id) {
    try {
        // Falta la logica con el smart contract - por ahora lo dejamos directo
        let mappedBody = {}
    
        if (!(typeof body.active === 'undefined')) {
            mappedBody["active"] = body.active
        }
    
        if (!(typeof body.end_date === 'undefined')) {
            mappedBody["end_date"] = body.end_date
        }

        const res = await instance.patch('/api/v1/' + user_id + '/subscriptions/' + body.suscription_name, mappedBody)

        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = { createSubscription, getSubscription, patchSubscription}