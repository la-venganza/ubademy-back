const ServerError = require("../errors/serverError")
const { verifyExam } = require("../utils/examHelper")

function lessonResolver(stages) {
    let lessons = []

    stages.forEach(element => {
        let lesson = {}

        if (!typeof element.active === 'undefined') {
            lesson["active"] = element.active
        }

        if (!typeof element.multimedia_id === 'undefined') {
            lesson["multimedia_id"] = element.multimedia_id
        }

        if (!typeof element.title === 'undefined') {
            lesson["title"] = element.title
        }

        if (!typeof element.multimedia_type === 'undefined') {
            lesson["multimedia_type"] = element.multimedia_type
        }

        if (!typeof element.position === 'undefined') {
            lesson["position"] = element.position
        }

        if (!typeof element.required === 'undefined') {
            lesson["required"] = element.required
        }

        if (!typeof element.exam === 'undefined') {
            lesson["exam"] = element.exam
        }

        lessons.push(lesson)
    })

    return lessons
}

function courseMappingPost(requestBody) {
    const stages = requestBody.stages

    if (typeof stages === 'undefined' || !Array.isArray(stages)) {
        throw new ServerError('Error', 'Bad request - field stages not an array', 400)
    }

    stages.forEach(stage => {
        if(!(typeof stage.exam === 'undefined')) {
            verifyExam(stage.exam)
        }
    })

    const lessons = lessonResolver(stages)

    const body = {
        "user_id": requestBody.user_id,
        "title": requestBody.title || "titulo del curso",
        "description": requestBody.description || "descripcion del curso",
        "type": requestBody.type || "course",
        "plan": requestBody.plan || "free",
        "hashtags": requestBody.hashtags || "hashtags",
        "location": requestBody.location || "internet",
        "lessons": lessons
    }

    return body
}

function courseMappingPatch(requestBody) {
    const stages = requestBody.stages
    let body = {
        "user_id": requestBody.user_id,
        "course": {

        }
    }

    if (!(typeof stages === 'undefined') && Array.isArray(stages)) {
        const lessons = lessonResolver(stages)
        body.course["lessons"] = lessons
    } else if (!Array.isArray(stages) && !(typeof stages === 'undefined')) {
        throw new ServerError('Error', 'Bad request - field stages not an array', 400)
    }

    if (!(typeof requestBody.description === 'undefined')) {
        body.course["description"] = requestBody.description
    }

    if (!(typeof requestBody.title === 'undefined')) {
        body.course["title"] = requestBody.title
    }

    return body
}
module.exports = { courseMappingPost, courseMappingPatch }
