const ServerError = require('../../src/errors/serverError')
const requestMapper = require('../../src/utils/requestMapper')

describe("RequestMapper", () => {
    describe("courseMappingPatch", () => {
        it('maps full response', () => {
            const body = {
                "user_id": "id",
                "title": "title",
                "description": "description",
                "stages": [
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "required": "required",
                        "position": "position",
                        "title": "title"
                    },
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "required": "required",
                        "position": "position",
                        "title": "title"
                    }                      
                ]
            }

            const expectedRes = {
                "user_id": "id",
                "course": {
                    "title": "title",
                    "description": "description",
                    "lessons": [
                        {
                            "active": "active",
                            "multimedia_id": "multimedia_id",
                            "multimedia_type": "multimedia_type",
                            "require": "required",
                            "sequence_number": "position",
                            "title": "title"
                        },
                        {
                            "active": "active",
                            "multimedia_id": "multimedia_id",
                            "multimedia_type": "multimedia_type",
                            "require": "required",
                            "sequence_number": "position",
                            "title": "title"
                        }   
                    ]
                }
            }

            const res = requestMapper.courseMappingPatch(body)

            expect(res).toEqual(expectedRes)
        })

        it('maps only the given fields (description, title)', () => {
            const body = {
                "user_id": "id",
                "title": "title",
                "description": "description",
            }

            const expectedRes = {
                "user_id": "id",
                "course": {
                    "title": "title",
                    "description": "description",
                }
            }

            const res = requestMapper.courseMappingPatch(body)

            expect(res).toEqual(expectedRes)
        })

        it('maps only the given fields (lessons)', () => {
            const body = {
                "user_id": "id",
                "stages": [
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "required": "required",
                        "position": "position",
                        "title": "title"
                    },
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "required": "required",
                        "position": "position",
                        "title": "title"
                    }                      
                ]
            }

            const expectedRes = {
                "user_id": "id",
                "course": {
                    "lessons": [
                        {
                            "active": "active",
                            "multimedia_id": "multimedia_id",
                            "multimedia_type": "multimedia_type",
                            "require": "required",
                            "sequence_number": "position",
                            "title": "title"
                        },
                        {
                            "active": "active",
                            "multimedia_id": "multimedia_id",
                            "multimedia_type": "multimedia_type",
                            "require": "required",
                            "sequence_number": "position",
                            "title": "title"
                        }   
                    ]
                }
            }

            const res = requestMapper.courseMappingPatch(body)

            expect(res).toEqual(expectedRes)
        })
    })

    describe("courseMappingPost", () => {
        it('maps full response with default values', () => {
            const body = {
                "user_id": "user_id",
                "title": "title",
                "description": "description",
                "stages": [
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "required": "required",
                        "position": "position",
                        "title": "title"
                    },
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "required": "required",
                        "position": "position",
                        "title": "title"
                    }                      
                ]
            }

            const expectedRes = {
                "user_id": "user_id",
                "title": "title",
                "description": "description",
                "hashtags": "hashtags",
                "location": "internet",
                "type": "course",
                "lessons": [
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "require": "required",
                        "sequence_number": "position",
                        "title": "title"
                    },
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "require": "required",
                        "sequence_number": "position",
                        "title": "title"
                    }   
                ]   
            }

            const res = requestMapper.courseMappingPost(body)

            expect(res).toEqual(expectedRes)
        })

        it('maps full response with given values', () => {
            const body = {
                "user_id": "user_id",
                "title": "title",
                "description": "description",
                "hashtags": "some_hashtags",
                "location": "some_internet",
                "course": "some_course",
                "stages": [
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "required": "required",
                        "position": "position",
                        "title": "title"
                    },
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "required": "required",
                        "position": "position",
                        "title": "title"
                    }                      
                ]
            }

            const expectedRes = {
                "user_id": "user_id",
                "title": "title",
                "description": "description",
                "hashtags": "some_hashtags",
                "location": "some_internet",
                "type": "some_course",
                "lessons": [
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "require": "required",
                        "sequence_number": "position",
                        "title": "title"
                    },
                    {
                        "active": "active",
                        "multimedia_id": "multimedia_id",
                        "multimedia_type": "multimedia_type",
                        "require": "required",
                        "sequence_number": "position",
                        "title": "title"
                    }   
                ]   
            }

            const res = requestMapper.courseMappingPost(body)

            expect(res).toEqual(expectedRes)
        })

        it('fails with exception when stages is not in request', () => {
            const body = {
                "user_id": "user_id",
                "title": "title",
                "description": "description",
            }

            expect(() => requestMapper.courseMappingPost(body)).toThrow(ServerError)
        })

        it('fails with exception when stages is not an array', () => {
            const body = {
                "user_id": "user_id",
                "title": "title",
                "description": "description",
                "stages": "5"
            }

            expect(() => requestMapper.courseMappingPost(body)).toThrow(ServerError)
        })
    })
})
