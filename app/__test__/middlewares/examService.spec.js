const examService = require('../../src/middlewares/examService')
const instance = require('../../src/utils/axiosHelper')
const ConnectionError = require('../../src/errors/connectionError')
const ServerError = require('../../src/errors/serverError')

jest.mock('../../src/utils/axiosHelper')

// describe("getCourses", () => {
//     it("gets courses", async () => {
//         const expectedRes = {
//             results: [{
//                 "title": "course 1"
//             },
//             {
//                 "title": "course 2"            
//             }]
//         }

//         instance.get.mockResolvedValue({
//             data: expectedRes
//         }       
//         )

//         const res = await courseService.getCourses()
//         expect(res).toEqual(expectedRes)
//     })

//     it("throws ServerError", async () => {
//         instance.get.mockRejectedValueOnce({
//             response: "has response",
//             message: "message"
//         }
//         )

//         expect(courseService.getCourses()).rejects.toThrowError(ServerError)
//         expect(courseService.getCourses()).rejects.toThrowError("message")
//     })

//     it("throws ConnectionError", async () => {
//         instance.get.mockRejectedValueOnce({
//             request: "has request",
//             message: "message"
//         }
//         )

//         expect(courseService.getCourses()).rejects.toThrowError(ConnectionError)
//         expect(courseService.getCourses()).rejects.toThrowError("message")
//     })

//     it("throws Error", async () => {
//         instance.get.mockRejectedValueOnce({
//         }
//         )

//         expect(courseService.getCourses()).rejects.toThrowError(Error)
//     })
// })

// describe("getCourseById", () => {
//     const expectedRes = {
//         "title": "course 1"
//     }
//     it("gets course", async () => {
//         instance.get.mockResolvedValue({
//             data: expectedRes
//         }       
//         )

//         const res = await courseService.getCourseById(1)
//         expect(res).toEqual(expectedRes)
//     })

//     it("throws ServerError", async () => {
//         instance.get.mockRejectedValueOnce({
//             response: "has response",
//             message: "message"
//         }
//         )

//         expect(courseService.getCourseById(1)).rejects.toThrowError(ServerError)
//         expect(courseService.getCourseById(1)).rejects.toThrowError("message")
//     })

//     it("throws ConnectionError", async () => {
//         instance.get.mockRejectedValueOnce({
//             request: "has request",
//             message: "message"
//         }
//         )

//         expect(courseService.getCourseById(1)).rejects.toThrowError(ConnectionError)
//         expect(courseService.getCourseById(1)).rejects.toThrowError("message")
//     })

//     it("throws Error", async () => {
//         instance.get.mockRejectedValueOnce({
//         }
//         )

//         expect(courseService.getCourseById(1)).rejects.toThrowError(Error)
//     })
// })

describe("createExam", () => {
    const expectedRes = {
        "exam": {
            "questions": []
        }
    }

    it("posts exam", async () => {
        instance.post.mockResolvedValue({
            data: expectedRes
        }       
        )

        const res = await examService.createExam(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.post.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(examService.createExam(expectedRes)).rejects.toThrowError(ServerError)
        expect(examService.createExam(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(examService.createExam(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(examService.createExam(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.post.mockRejectedValueOnce({
        }
        )

        expect(examService.createExam(expectedRes)).rejects.toThrowError(Error)
    })
})

describe("patchExam", () => {
    const expectedRes = {
        "title": "exam 1"
    }
    it("patches exam", async () => {
        instance.patch.mockResolvedValue({
            data: expectedRes
        })

        const res = await examService.patchExam(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.patch.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(examService.patchExam(expectedRes)).rejects.toThrowError(ServerError)
        expect(examService.patchExam(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.patch.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(examService.patchExam(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(examService.patchExam(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.patch.mockRejectedValueOnce({
        }
        )

        expect(examService.patchExam(expectedRes)).rejects.toThrowError(Error)
    })
})