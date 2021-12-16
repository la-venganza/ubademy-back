// Middleware para resolver llamadas a SC
const SCinstance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')

async function getBalance (wallet_id) {
    try {
        const res = await SCinstance.get('/balance/' + wallet_id)

        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function deposit (wallet_id, body) {
    try {
        const mappedBody = {
            "teacherId": wallet_id,
            "amountInEthers": body.amount
        }

        const res = await SCinstance.post('/deposit', mappedBody)
        
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getWallet (wallet_id) {
    try {
        const res = await SCinstance.get('/wallet/' + wallet_id)
        
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function createWallet (wallet_id) {
    try {
        const res = await SCinstance.post('/wallet/' + wallet_id)
        
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getTeacherBalance (wallet_id) {
    try {
        const res = await SCinstance.get('/teacherBalance/' + wallet_id)
        
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function payTeacher (wallet_id) {
    try {
        const mappedBody = {
            "teacherId": wallet_id,
            "amountInEthers": body.amount
        }

        const res = await SCinstance.post('/payTeacher', mappedBody)
        
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function teacherWithdraw (wallet_id, body) {
    try {
        const mappedBody = {
            "teacherId": wallet_id,
            "recieverAddress": body.recieverAddress
        }

        const res = await SCinstance.post('/teacherWithdraw', mappedBody)
        
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getOwnerBalance () {
    try {
        const res = await SCinstance.get('/availableBalance')
        
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function ownerRedraw (body) {
    try {

        const res = await SCinstance.post('/ownerRedraw', body)
        
        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = { getBalance, deposit, getWallet, createWallet, getTeacherBalance, 
                   payTeacher, teacherWithdraw, getOwnerBalance, ownerRedraw }