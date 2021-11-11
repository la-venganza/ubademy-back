const requestMapper = require('../../src/utils/requestMapper')

describe("RequestMapper", () => {
    describe("courseMappingPatch", () => {
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

        it('maps response', () => {
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
    })
})
