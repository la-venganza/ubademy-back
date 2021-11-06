// Middleware para resolver llamadas a python
const ConnectionError = require('../errors/connectionError')
const axios = require('axios').default;

const instance = axios.create({
    baseURL: process.env.BACK_PY,
});

async function getUserByEmail (email) {
     try {
        const res = await instance.get('/api/v1/users?email=' + email)
        return res.data
    } catch (e) {
        throw new ConnectionError(e, 'Python Service')
    }
}

async function createUser (body) {
    // try {
        const res = await instance.post('/api/v1/users', body)
        return res.data
    // } catch (e) {
    //     throw new ConnectionError(e, 'Python Service')
    // }
}
module.exports = {getUserByEmail,
 createUser}