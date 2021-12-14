// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')

async function getUserByEmail (email) {
     try {
        const res = await instance.get('/api/v1/users?email=' + email)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getUserById (id, query) {
    try {
        path = '/api/v1/users/' + id
        if (query.properties) {
            path += '?properties=' + query.properties
        }
        const res = await instance.get(path)
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
        const res = await instance.patch('/api/v1/users/' + id, body)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getAdminByEmail (email) {
     try {
        const res = await instance.get('/api/v1/users?email=' + email)

        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = {getUserByEmail, createUser, updateUser, getUserById, getAdminByEmail }
