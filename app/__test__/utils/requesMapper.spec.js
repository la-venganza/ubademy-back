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
        it('maps full response', () => {
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
    })
})
