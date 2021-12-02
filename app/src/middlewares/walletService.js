// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')

async function getBalance (user_id) {
    try {
        //TODO pegarle al microservicio de smart contract

        res.data = {
            balance: 500
        }

        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function addBalance (body, user_id) {
    try {
        //TODO pegarle al microservicio de smart contract

        res.data = {
            balance: body.balance
        }

        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = { getBalance, addBalance }