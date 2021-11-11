const ServerError = require("../errors/serverError")

function lessonResolver(stages) {
    let lessons = []

    if (typeof stages === 'undefined' || !Array.isArray(stages)) {
        throw new ServerError('Error', 'Bad request - field stages not an array', 400)
    }

    //TODO: una vez que empezemos con la parte de examenes, verificar que un examen tenga preguntas

    stages.forEach(element => {
        let lesson = {
            "active": element.active,
            "multimedia_id": element.multimedia_id,
            "title": element.title,
            "multimedia_type": element.multimedia_type,
            "sequence_number": element.position,
            "require": element.required,
        }
        lessons.push(lesson)
    })

    return lessons
}

function courseMappingPost(requestBody) {
    const stages = requestBody.stages

    const lessons = lessonResolver(stages)

    const body = {
        "title": requestBody.title,
        "description": requestBody.description,
        "type": "course",
        "hashtags": "hasthags",
        "location": "internet",
        "lessons": lessons
    }

    return body
}

function courseMappingPatch(requestBody) {
    const stages = requestBody.stages

    const lessons = lessonResolver(stages)

    const body = {
        "user_id": requestBody.user_id,
        "course": {
            "title": requestBody.title,
            "description": requestBody.description,
            "lessons": lessons
        }
    }

    return body
}

module.exports = { courseMappingPost, courseMappingPatch }