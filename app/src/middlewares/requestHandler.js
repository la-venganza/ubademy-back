// Middleware para resolver llamadas a python
const ConnectionError = require('../errors/connectionError')
const axios = require('axios').default;

const instance = axios.create({
    baseURL: process.env.BACK_PY,
});

async function getUserByEmail (email) {
    try {
        const res = await instance.get('/api/v1/users')
        return res
    } catch (e) {
        throw new ConnectionError(e, 'Python Service')
    }
}

module.exports = getUserByEmail