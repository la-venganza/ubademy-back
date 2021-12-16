const walletService = require('../../src/middlewares/walletService')
const instance = require('../../src/utils/axiosHelper')
const ConnectionError = require('../../src/errors/connectionError')
const ServerError = require('../../src/errors/serverError')

jest.mock('../../src/utils/axiosHelper')

describe("getBalance", () => {
    it("returns balance", async () => {
        const expectedRes = {
            balance: 500
        }

        instance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await walletService.getBalance(10)
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

        expect(walletService.getBalance(10)).rejects.toThrowError(ServerError)
        expect(walletService.getBalance(10)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(walletService.getBalance(10)).rejects.toThrowError(ConnectionError)
        expect(walletService.getBalance(10)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.get.mockRejectedValueOnce({
        }
        )

        expect(walletService.getBalance(10)).rejects.toThrowError(Error)
    })
})
