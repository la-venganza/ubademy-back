function courseMapping(requestBody) {
    let lessons = []
    const stages = requestBody.stages

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