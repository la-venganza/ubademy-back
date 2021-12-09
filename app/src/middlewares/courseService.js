// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')

async function getCourses (params) {
    try {
        path = '/api/v1/courses'
        if (params.page) {
            path = '?page=' + params.page
        } else {
            path = '?page=1'
        }
        if (params.keyword) {
            path += '&keyword=' + params.keyword
        }
        if (params.category) {
            path += '&category=' + params.category
        }
        if (params.plan) {
            path += '&plan=' + params.plan
        }
        const res = await instance.get(path)
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

async function addRegistration (id, body) {
    try {
        const res = await instance.post('/api/v1/courses/' + id + '/registration', body)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function addCollaborator (id, body) {
    try {
        const res = await instance.post('/api/v1/courses/' + id + '/collaborator', body)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = {createCourse, getCourses, getCourseById, updateCourse, addRegistration, addCollaborator }