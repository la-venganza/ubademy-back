// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')

async function getUsers(query) {
    try {
        path = '/api/v1/users'
        if (query.page) {
            path += '?page=' + query.page
        } else {
            path += '?page=1'
        }
        if (query.keyword) {
            path += '&keyword=' + query.keyword
        }
        if (query.max_results) {
            path += '&max_results=' + query.max_results
        }
        const res = await instance.get(path)
        return res.data
   } catch (e) {
        handleError(e)
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

module.exports = { getUsers, getUserByEmail, createUser, updateUser, getUserById, getAdminByEmail }
