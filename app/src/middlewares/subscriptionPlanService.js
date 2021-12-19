// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const {handleError} = require('../utils/errorHandler')

async function getSubscriptions () {
    try {
        const res = await instance.get('/api/v1/subscription_plans/')

        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getSubscriptionPlan (subscription_id) {
    try {
        const res = await instance.get('/api/v1/subscription_plans/' + subscription_id)

        return res.data
    } catch (e) {
        handleError(e)
    }
}


module.exports = { getSubscriptions, getSubscriptionPlan }
