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

module.exports = { createExam }

