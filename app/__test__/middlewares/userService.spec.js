const userService = require('../../src/middlewares/userService')
const instance = require('../../src/utils/axiosHelper')
const ConnectionError = require('../../src/errors/connectionError')
const ServerError = require('../../src/errors/serverError')

jest.mock('../../src/utils/axiosHelper')

describe("getUserByEmail", () => {
    it("returns user", async () => {
        const expectedRes = {
            "first_name": "Optional name",
            "last_name": "Optional lastname",
            "role": "Optional role",
            "birth_date": "20/03/1990",
            "phone_type": "Optional phoneType",
            "phone_number": "Optional phoneNumber",
            "subscription": "Optional subscription",
        }

        instance.get.mockResolvedValue({
            data: expectedRes
        }       
        )

        const res = await userService.getUserByEmail("email@test.com")
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.get.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(userService.getUserByEmail("email@test.com")).rejects.toThrowError(ServerError)
        expect(userService.getUserByEmail("email@test.com")).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(userService.getUserByEmail("email@test.com")).rejects.toThrowError(ConnectionError)
        expect(userService.getUserByEmail("email@test.com")).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.get.mockRejectedValueOnce({
        }
        )

        expect(userService.getUserByEmail("email@test.com")).rejects.toThrowError(Error)
    })
})

describe("createUser", () => {
    const expectedRes = {
        "first_name": "Optional name",
        "last_name": "Optional lastname",
        "role": "Optional role",
        "birth_date": "20/03/1990",
        "phone_type": "Optional phoneType",
        "phone_number": "Optional phoneNumber",
        "subscription": "Optional subscription",
    }
    it("posts user", async () => {
        instance.post.mockResolvedValue({
            data: expectedRes
        }       
        )

        const res = await userService.createUser(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.post.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(userService.createUser(expectedRes)).rejects.toThrowError(ServerError)
        expect(userService.createUser(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(userService.createUser(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(userService.createUser(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.post.mockRejectedValueOnce({
        }
        )

        expect(userService.createUser(expectedRes)).rejects.toThrowError(Error)
    })
})

describe("updateUser", () => {
    const expectedRes = {
        "first_name": "Optional name",
        "last_name": "Optional lastname",
        "role": "Optional role",
        "birth_date": "20/03/1990",
        "phone_type": "Optional phoneType",
        "phone_number": "Optional phoneNumber",
        "subscription": "Optional subscription",
    }
    it("puts user", async () => {
        instance.patch.mockResolvedValue({
            data: expectedRes
        }       
        )

        const res = await userService.updateUser(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.patch.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(userService.updateUser(expectedRes)).rejects.toThrowError(ServerError)
        expect(userService.updateUser(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.patch.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(userService.updateUser(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(userService.updateUser(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.patch.mockRejectedValueOnce({
        }
        )

        expect(userService.updateUser(expectedRes)).rejects.toThrowError(Error)
    })
})