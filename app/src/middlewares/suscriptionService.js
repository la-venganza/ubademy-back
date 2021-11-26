// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')

async function createSuscription (body) {
    try {
        //path

        //const res = await instance.get(path)
        res = {
            
        }
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getSuscription (body) {
    try {
        //path

        //const res = await instance.get(path)
        res = {
            
        }
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function patchSuscription (body) {
    try {
        //path

        //const res = await instance.get(path)
        res = {
            
        }
        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = { createSuscription, getSuscription, patchSuscription}