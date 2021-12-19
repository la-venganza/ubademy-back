// Middleware para resolver llamadas a SC
const SCinstance = require('../utils/SCaxiosHelper')
const { handleError, handleSCError } = require('../utils/errorHandler')

async function getBalance (wallet_id) {
    try {
        const res = await SCinstance.get('/balance/' + wallet_id)

        return res.data
    } catch (e) {
        handleSCError(e)
    }
}

async function deposit (wallet_id, body) {
    try {
        const mappedBody = {
            "senderId": wallet_id,
            "amountInEthers": body.amount || '0'
        }

        const res = await SCinstance.post('/deposit', mappedBody)
        
        return res.data
    } catch (e) {
        handleSCError(e)
    }
}

async function getWallet (wallet_id) {
    try {
        const res = await SCinstance.get('/wallet/' + wallet_id)
        
        return res.data
    } catch (e) {
        handleSCError(e)
    }
}

async function createWallet (wallet_id) {
    try {
        console.log("LOG")

        const res = await SCinstance.post('/wallet/' + wallet_id, {})

        console.log(res)

        return res.data
    } catch (e) {
        handleSCError(e)
    }
}

async function getTeacherBalance (wallet_id) {
    try {
        const res = await SCinstance.get('/teacherBalance/' + wallet_id)
        
        return res.data
    } catch (e) {
        handleSCError(e)
    }
}

async function payTeacher (wallet_id, body) {
    try {
        const mappedBody = {
            "teacherId": wallet_id,
            "amountInEthers": body.amount || '0'
        }

        console.log(mappedBody)

        const res = await SCinstance.post('/payTeacher', mappedBody)

        console.log(res.data)

        return res.data
    } catch (e) {
        if (e.status == 500) {
            console.log('Error conectando al servicio')
        }
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
        handleSCError(e)
    }
}

async function getOwnerBalance () {
    try {
        const res = await SCinstance.get('/availableBalance')
        
        return res.data
    } catch (e) {
        handleSCError(e)
    }
}

async function ownerWithdraw (body) {
    try {
        const res = await SCinstance.post('/ownerWithdraw', body)
        
        return res.data
    } catch (e) {
        handleSCError(e)
    }
}

module.exports = { getBalance, deposit, getWallet, createWallet, getTeacherBalance, 
                   payTeacher, teacherWithdraw, getOwnerBalance, ownerWithdraw }