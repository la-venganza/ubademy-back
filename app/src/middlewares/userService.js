// Middleware para resolver llamadas a python
const ConnectionError = require('../errors/connectionError')
const ServerError = require('../errors/serverError')
const axios = require('axios').default;

const instance = axios.create({
    baseURL: process.env.BACK_PY,
});

function handleError(error){
    if (error.response) {
        //custom errors for server status response
        console.log("there was a response ")
        throw new ServerError(e, error.message)
    } else if (error.request) {
        //custom error for unresponsive server
        console.log("no response from python service")
        throw new ConnectionError(e, 'Python Service is not responding')

    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
    }
}


async function getUserByEmail (email) {
     try {
        const res = await instance.get('/api/v1/users?email=' + email)
        return res.data
    } catch (e) {
        handleError(e)
    }
}
async function createUser (body) {
    try {
        const res = await instance.post('/api/v1/users', body)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function updateUser (id, body) {
    try {
        const res = await instance.patch('/api/v1/courses/' + id, body)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = {getUserByEmail, createUser, updateUser}