// Middleware para resolver llamadas a python
const instance = require('../utils/axiosHelper')
const handleError = require('../utils/errorHandler')
const examHelper = require('../utils/examHelper')

async function createExam (body) {
    try {
        path = '/api/v1/courses/' + body.course_id + '/lessons/' + body.lesson_id + '/exams'

        mappedBody = examHelper.examMappingPost(body)

        const res = await instance.post(path, mappedBody)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function getExam (body) {
    try {
        path = '/api/v1/courses/' + body.course_id + '/lessons/' + body.lesson_id + '/exams/' + body.exam_id

        const res = await instance.get(path)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

async function patchExam (body) {
    try {
        path = '/api/v1/courses/' + body.course_id + '/lessons/' + body.lesson_id + '/exams/' + body.exam_id

        mappedBody = examHelper.examMappingPatch(body)

        const res = await instance.patch(path, mappedBody)
        return res.data
    } catch (e) {
        handleError(e)
    }
}

module.exports = { createExam, patchExam, getExam }

