const courseService = require('../../src/middlewares/courseService')
const instance = require('../../src/utils/axiosHelper')
const ConnectionError = require('../../src/errors/connectionError')
const ServerError = require('../../src/errors/serverError')

jest.mock('../../src/utils/axiosHelper')

describe("getCourses", () => {
    const sentReq = {
        "keyword": "string",
        "category": "category",
        "plan": "plan",
        "page": 1
    }
    it("gets courses", async () => {
        const expectedRes = {
            results: [{
                "title": "course 1"
            },
            {
                "title": "course 2"
            }]
        }

        instance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await courseService.getCourses(sentReq)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.get.mockRejectedValueOnce({
            "detail": [
                {
                    "loc": [
                        "string"
                    ],
                    "msg": "string",
                    "type": "string"
                }
            ]
        }
        )

        expect(courseService.getCourses(sentReq)).rejects.toThrowError(ServerError)
        expect(courseService.getCourses(sentReq)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(courseService.getCourses(sentReq)).rejects.toThrowError(ConnectionError)
        expect(courseService.getCourses(sentReq)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.get.mockRejectedValueOnce({
        }
        )

        expect(courseService.getCourses(sentReq)).rejects.toThrowError(Error)
    })
})

describe("getCourseById", () => {
    const expectedRes = {
        "title": "course 1"
    }
    const sentQuery = {
        "user_id": "string"
    }
    it("gets course", async () => {
        instance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await courseService.getCourseById(1, sentQuery)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.get.mockRejectedValueOnce({
            "detail": [
                {
                    "loc": [
                        "string"
                    ],
                    "msg": "string",
                    "type": "string"
                }
            ]
        }
        )

        expect(courseService.getCourseById(1, sentQuery)).rejects.toThrowError(ServerError)
        expect(courseService.getCourseById(1, sentQuery)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(courseService.getCourseById(1, sentQuery)).rejects.toThrowError(ConnectionError)
        expect(courseService.getCourseById(1, sentQuery)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.get.mockRejectedValueOnce({
        }
        )

        expect(courseService.getCourseById(1, sentQuery)).rejects.toThrowError(Error)
    })
})

describe("createCourse", () => {
    const expectedRes = {
        "title": "course 1"
    }
    it("posts course", async () => {
        instance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await courseService.createCourse(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.post.mockRejectedValueOnce({
            "detail": [
                {
                    "loc": [
                        "string"
                    ],
                    "msg": "string",
                    "type": "string"
                }
            ]
        }
        )

        expect(courseService.createCourse(expectedRes)).rejects.toThrowError(ServerError)
        expect(courseService.createCourse(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(courseService.createCourse(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(courseService.createCourse(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.post.mockRejectedValueOnce({
        }
        )

        expect(courseService.createCourse(expectedRes)).rejects.toThrowError(Error)
    })
})

describe("updateCourse", () => {
    const expectedRes = {
        "title": "course 1"
    }
    it("patches course", async () => {
        instance.patch.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await courseService.updateCourse(1, expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.patch.mockRejectedValueOnce({
            "detail": [
                {
                    "loc": [
                        "string"
                    ],
                    "msg": "string",
                    "type": "string"
                }
            ]
        }
        )

        expect(courseService.updateCourse(1, expectedRes)).rejects.toThrowError(ServerError)
        expect(courseService.updateCourse(1, expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.patch.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(courseService.updateCourse(1, expectedRes)).rejects.toThrowError(ConnectionError)
        expect(courseService.updateCourse(1, expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.patch.mockRejectedValueOnce({
        }
        )

        expect(courseService.updateCourse(1, expectedRes)).rejects.toThrowError(Error)
    })
})

describe("addRegistration", () => {
    const expectedRes = {
        "user_id": "1"
    }
    it("posts registration", async () => {
        instance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await courseService.addRegistration(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.post.mockRejectedValueOnce({
            "detail": [
                {
                    "loc": [
                        "string"
                    ],
                    "msg": "string",
                    "type": "string"
                }
            ]
        }
        )

        expect(courseService.addRegistration(expectedRes)).rejects.toThrowError(ServerError)
        expect(courseService.addRegistration(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(courseService.addRegistration(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(courseService.addRegistration(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.post.mockRejectedValueOnce({
        }
        )

        expect(courseService.addRegistration(expectedRes)).rejects.toThrowError(Error)
    })
})

describe("addCollaborator", () => {
    const expectedRes = {
        "user_id": "1"
    }
    it("posts collaborator", async () => {
        instance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await courseService.addCollaborator(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.post.mockRejectedValueOnce({
            "detail": [
                {
                    "loc": [
                        "string"
                    ],
                    "msg": "string",
                    "type": "string"
                }
            ]
        }
        )

        expect(courseService.addCollaborator(expectedRes)).rejects.toThrowError(ServerError)
        expect(courseService.addCollaborator(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(courseService.addCollaborator(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(courseService.addCollaborator(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.post.mockRejectedValueOnce({
        }
        )

        expect(courseService.addCollaborator(expectedRes)).rejects.toThrowError(Error)
    })
})

describe("undoRegistration", () => {
    const expectedRes = {
        "user_id": "1"
    }
    it("patches registration", async () => {
        instance.patch.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await courseService.undoRegistration(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.patch.mockRejectedValueOnce({
            "detail": [
                {
                    "loc": [
                        "string"
                    ],
                    "msg": "string",
                    "type": "string"
                }
            ]
        }
        )

        expect(courseService.undoRegistration(expectedRes)).rejects.toThrowError(ServerError)
        expect(courseService.undoRegistration(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.patch.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(courseService.undoRegistration(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(courseService.undoRegistration(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.patch.mockRejectedValueOnce({
        }
        )

        expect(courseService.undoRegistration(expectedRes)).rejects.toThrowError(Error)
    })
})

describe("getTypes", () => {
    const expectedRes = {
        "course_types": [
            "string"
        ]
    }
    it("gets types", async () => {
        instance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await courseService.getTypes()
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.get.mockRejectedValueOnce({
            "detail": [
                {
                    "loc": [
                        "string"
                    ],
                    "msg": "string",
                    "type": "string"
                }
            ]
        }
        )

        expect(courseService.getTypes()).rejects.toThrowError(ServerError)
        expect(courseService.getTypes()).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(courseService.getTypes()).rejects.toThrowError(ConnectionError)
        expect(courseService.getTypes()).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.get.mockRejectedValueOnce({
        }
        )

        expect(courseService.getTypes()).rejects.toThrowError(Error)
    })
})