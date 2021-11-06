// Middleware para resolver llamadas a python
const ConnectionError = require('../errors/connectionError')
const axios = require('axios').default;

const instance = axios.create({
    baseURL: process.env.BACK_PY,
});

function handleError(error){
    if (error.response) {
        //custom errors for server status response
        console.log("there was a response ")
        throw error
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

async function getCourseById (id) {
    try {
        const res = await instance.get('/api/v1/courses/' + id)
        return res.data
    } catch (e) {
        handleError(e)
    }
}
async function createCourse (body) {
    try {
        const res = await instance.post('/api/v1/courses', body)
        return res.data
    } catch (e) {
        handleError(e)
    }
}
async function updateCourse (id, body) {
    try {
        const res = await instance.patch('/api/v1/courses/' + id, body)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = {getUserByEmail, createUser, updateUser, createCourse, getCourseById, updateCourse}