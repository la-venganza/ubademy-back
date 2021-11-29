const ServerError = require("../errors/serverError")

function verifyExam(exam) {
    if (typeof exam.questions === 'undefined' || !Array.isArray(exam.questions)) {
        throw new ServerError('Error', 'Bad request - field questions not an array', 400)
    }
}

function verifySolution(exam) {
    if (typeof exam.answers === 'undefined' || !Array.isArray(exam.answers)) {
        throw new ServerError('Error', 'Bad request - field answers not an array', 400)
    }
}

function examMapping(requestBody) {
    verifyExam(requestBody.exam)

    body = {
        'user_id': requestBody.user_id,
        'exam': requestBody.exam
    }

    return body
}

module.exports = { examMapping, verifyExam, verifySolution }
