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

function verifyGrading(grading) {
    if (typeof grading.user_id === 'undefined') {
        throw new ServerError('Error', 'Bad request - missing user_id', 400)
    }

    if (typeof grading.exam_to_grade_id === 'undefined') {
        throw new ServerError('Error', 'Bad request - missing exam_to_grade_id', 400)
    }

    if (typeof grading.enroll_course_id === 'undefined') {
        throw new ServerError('Error', 'Bad request - missing enroll_course_id', 400)
    }

    if (typeof grading.grade === 'undefined') {
        throw new ServerError('Error', 'Bad request - missing grade', 400)
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

module.exports = { examMapping, verifyExam, verifySolution, verifyGrading }
