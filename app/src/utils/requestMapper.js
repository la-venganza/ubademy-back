const ServerError = require("../errors/serverError")

function lessonResolver(stages) {
    let lessons = []

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

    if (typeof stages === 'undefined' || !Array.isArray(stages)) {
        throw new ServerError('Error', 'Bad request - field stages not an array', 400)
    }

    //TODO: una vez que empezemos con la parte de examenes, verificar que un examen tenga preguntas

    const lessons = lessonResolver(stages)

    const body = {
        "user_id": requestBody.user_id,
        "title": requestBody.title || "titulo del curso",
        "description": requestBody.description || "descripcion del curso",
        "type": requestBody.course || "course",
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