// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')

async function getBalance (user_id) {
    try {
        //TODO pegarle al microservicio de smart contract

        res = {
            balance: 500
        }

        return res
    } catch (e) {
        handleError(e)
    }
}

module.exports = { getBalance }