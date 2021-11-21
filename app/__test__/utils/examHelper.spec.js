const ServerError = require('../../src/errors/serverError')
const examHelper = require('../../src/utils/examHelper')

describe("ExamHelper", () => {
    describe("verifyExam", () => {
      it('throws ServerError when questions is undefined', () => {
        const body = {
          "title": "string",
          "description": "string",
          "minimum_qualification": 0,
        }

        expect(() => examHelper.verifyExam(body)).toThrow(ServerError)
      })

      it('throws ServerError when questions is not an array', () => {
        const body = {
          "title": "string",
          "description": "string",
          "minimum_qualification": 0,
          "questions": "algo"
        }

        expect(() => examHelper.verifyExam(body)).toThrow(ServerError)
      })

      it('does not throw an error when questions is an array', () => {
        const body = {
          "title": "string",
          "description": "string",
          "minimum_qualification": 0,
          "questions": []
        }

        expect(() => examHelper.verifyExam(body)).not.toThrow(ServerError)
      })
    })

    describe("examMapping", () => {
        it('maps full response', () => {
            const body = {
                "user_id": "id",
                "exam": {
                    "title": "string",
                    "description": "string",
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

            const expectedRes = {
                "user_id": "id",
                "exam": {
                    "title": "string",
                    "description": "string",
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

            const res = examHelper.examMapping(body)

            expect(res).toEqual(expectedRes)
        })

        it('throws error when non array stages', () => {
            const body = {
                "user_id": "id",
                "exam": {
                    "title": "string",
                    "description": "string",
                    "minimum_qualification": 0,
                    "questions": {}
                }
            }

            expect(() => examHelper.examMapping(body)).toThrow(ServerError)
        })
    })
})
