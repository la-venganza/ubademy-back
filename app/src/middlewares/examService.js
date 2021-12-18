// Middleware para resolver llamadas a python
const ServerError = require('../errors/serverError')
const { param } = require('../routes/exam')
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')
const examHelper = require('../utils/examHelper')

async function createExam (body) {
    try {
        path = '/api/v1/courses/' + body.course_id + '/lessons/' + body.lesson_id + '/exams'

        mappedBody = examHelper.examMapping(body)

        const res = await instance.post(path, mappedBody)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function solveExam (body, exam_id) {
    try {
        path = '/api/v1/courses/' + body.course_id + '/lessons/' + body.lesson_id + '/exams/' + exam_id + '/solution'

        examHelper.verifySolution(body)

        const res = await instance.post(path, body)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function gradeExam (body, exam_id) {
    try {
        path = '/api/v1/courses/' + body.course_id + '/lessons/' + body.lesson_id + '/exams/' + exam_id + '/solution'

        examHelper.verifyGrading(body)

        let mappedBody = {
            "user_id": body.user_id,
            "exam_to_grade_id": body.exam_to_grade_id,
            "enroll_course_id": body.enroll_course_id,
            "grade": body.grade
        }

        const res = await instance.patch(path, body)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getExamByTakenId (params, query) {
    try {
        path = '/api/v1/courses/' + params.course_id + '/lessons/' + params.lesson_id + '/exams/' + params.exam_id + '/solution/' + params.exam_taken_id
        if (query.user_id) {
            path += '?user_id=' + query.user_id
        }

        const res = await instance.get(path)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getExam (params) {
    try {
        path = '/api/v1/courses/' + params.course_id + '/lessons/' + params.lesson_id + '/exams/' + params.exam_id

        const res = await instance.get(path)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function searchExam (params) {
    try {
        if (typeof params.user_id === 'undefined') {
            throw new ServerError('Error', 'user_id query param is undefined', 500)
        }
        path = '/api/v1/courses/lessons/exams?user_id=' + params.user_id
        if (params.active_students) {
            path += '&active_students=' + params.active_students
        }
        if (params.graded_status) {
            path += '&graded_status=' + params.graded_status
        }
        if (params.page) {
            path += '&page=' + params.page
        }

        const res = await instance.get(path)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function patchExam (body) {
    try {
        path = '/api/v1/courses/' + body.course_id + '/lessons/' + body.lesson_id + '/exams/' + body.exam_id

        mappedBody = examHelper.examMapping(body)

        const res = await instance.patch(path, mappedBody)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = { createExam, patchExam, getExamByTakenId, getExam, solveExam, gradeExam, searchExam }

