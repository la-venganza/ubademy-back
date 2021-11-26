const examService = require('../../src/middlewares/examService')
const instance = require('../../src/utils/axiosHelper')
const ConnectionError = require('../../src/errors/connectionError')
const ServerError = require('../../src/errors/serverError')

jest.mock('../../src/utils/axiosHelper')

describe("getExam", () => {
    it("gets Exam", async () => {
        const expectedRes = {
            "exam": {
                "questions": []
            }
        }

        instance.get.mockResolvedValue({
            data: expectedRes
        }       
        )

        const res = await examService.getExam()
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.get.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(examService.getExam()).rejects.toThrowError(ServerError)
        expect(examService.getExam()).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(examService.getExam()).rejects.toThrowError(ConnectionError)
        expect(examService.getExam()).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.get.mockRejectedValueOnce({
        }
        )

        expect(examService.getExam()).rejects.toThrowError(Error)
    })
})

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

describe("solveExam", () => {
    it("posts Exam solution attempt", async () => {
        const expectedRes = {
            "answers": []
        }

        instance.get.mockResolvedValue({
            data: expectedRes
        }       
        )

        const res = await examService.solveExam()
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.get.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(examService.solveExam()).rejects.toThrowError(ServerError)
        expect(examService.solveExam()).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(examService.solveExam()).rejects.toThrowError(ConnectionError)
        expect(examService.solveExam()).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.get.mockRejectedValueOnce({
        }
        )

        expect(examService.solveExam()).rejects.toThrowError(Error)
    })
})