const ServerError = require("../errors/serverError")

function courseMapping(requestBody) {
    let lessons = []

    const stages = requestBody.stages

    if (typeof stages == 'undefined' || !Array.isArray(stages)) {
        throw new ServerError('Error', 'Bad request - field stages not an array')
    }

    //TODO: una vez que empezemos con la parte de examenes, veriicar que un examen tenga preguntas

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

module.exports = courseMapping;
