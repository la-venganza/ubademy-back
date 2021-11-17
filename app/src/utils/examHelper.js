const ServerError = require("../errors/serverError")

function verifyExam(exam) {
    if (typeof exam.questions === 'undefined' || !Array.isArray(exam.questions)) {
        throw new ServerError('Error', 'Bad request - field questions not an array', 400)
    }
}

function examMappingPost(requestBody) {
    verifyExam(requestBody.exam)

    body = {
        'user_id': requestBody.user_id,
        'exam': requestBody.exam
    }

    return body
}

function examMappingPatch(requestBody) {
    //TODO
}

module.exports = { examMappingPost, examMappingPatch, verifyExam }
