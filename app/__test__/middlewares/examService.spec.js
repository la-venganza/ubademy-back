const examService = require('../../src/middlewares/examService')
const instance = require('../../src/utils/axiosHelper')
const ConnectionError = require('../../src/errors/connectionError')
const ServerError = require('../../src/errors/serverError')

jest.mock('../../src/utils/axiosHelper')

describe("getExam", () => {
    const expectedRes = {
        "course_id": 1,
        "lesson_id": 1,
        "exam_id": 1
    }
    it("gets Exam", async () => {
        instance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await examService.getExam(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.get.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(examService.getExam(expectedRes)).rejects.toThrowError(ServerError)
        expect(examService.getExam(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(examService.getExam(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(examService.getExam(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.get.mockRejectedValueOnce({
        }
        )

        expect(examService.getExam(expectedRes)).rejects.toThrowError(Error)
    })
})

describe("createExam", () => {
    const expectedRes = {
        "course_id": 1,
        "lesson_id": 1,
        "user_id": "string",
        "exam": {
            "title": "string",
            "description": "string",
            "minimum_qualification": 0,
            "active": false,
            "questions": [
                {
                    "sequence_number": 0,
                    "type": "string",
                    "score": 0,
                    "multiple_choice_question": {
                        "text": "string",
                        "amount_of_options": 0,
                        "choices": [
                            {
                                "text": "string",
                                "is_correct": true
                            }
                        ]
                    },
                    "develop_question": {
                        "text": "string"
                    }
                }
            ]
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
        "course_id": 1,
        "lesson_id": 1,
        "user_id": "string",
        "exam": {
            "title": "string",
            "description": "string",
            "active": true,
            "minimum_qualification": 0,
            "questions": [
                {
                    "sequence_number": 0,
                    "type": "string",
                    "score": 0,
                    "multiple_choice_question": {
                        "text": "string",
                        "amount_of_options": 0,
                        "choices": [
                            {
                                "text": "string",
                                "is_correct": true,
                                "id": 0
                            }
                        ],
                        "id": 0
                    },
                    "develop_question": {
                        "text": "string",
                        "id": 0
                    },
                    "id": 0
                }
            ]
        }
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
    const expectedRes = {
        "user_id": "string",
        "course_id": 0,
        "lesson_id": 0,
        "answers": [
            {
                "question_id": "0",
                "choice_id": "0",
                "input_answer": "string"
            }
        ]
    }

    it("posts Exam solution attempt", async () => {
        instance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await examService.solveExam(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.post.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(examService.solveExam(expectedRes)).rejects.toThrowError(ServerError)
        expect(examService.solveExam(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(examService.solveExam(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(examService.solveExam(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.post.mockRejectedValueOnce({
        }
        )

        expect(examService.solveExam(expectedRes)).rejects.toThrowError(Error)
    })
})

describe("gradeExam", () => {
    const expectedRes = {
        "user_id": "string",
        "exam_to_grade_id": 0,
        "enroll_course_id": 0,
        "grade": 10
    }

    it("posts Exam solution attempt", async () => {
        instance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await examService.solveExam(expectedRes, 1)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.post.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(examService.solveExam(expectedRes, 1)).rejects.toThrowError(ServerError)
        expect(examService.solveExam(expectedRes, 1)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(examService.solveExam(expectedRes, 1)).rejects.toThrowError(ConnectionError)
        expect(examService.solveExam(expectedRes, 1)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.post.mockRejectedValueOnce({
        }
        )

        expect(examService.solveExam(expectedRes, 1)).rejects.toThrowError(Error)
    })
})