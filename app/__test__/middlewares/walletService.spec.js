const walletService = require('../../src/middlewares/walletService')
const SCinstance = require('../../src/utils/SCaxiosHelper')
const ConnectionError = require('../../src/errors/connectionError')
const ServerError = require('../../src/errors/serverError')

jest.mock('../../src/utils/SCaxiosHelper')

describe("getBalance", () => {
    it("returns balance", async () => {
        const expectedRes = {
            address: "string",
            balance: 500
        }

        SCinstance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await walletService.getBalance(10)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        SCinstance.get.mockRejectedValueOnce({
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
        SCinstance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(walletService.getBalance(10)).rejects.toThrowError(ConnectionError)
        expect(walletService.getBalance(10)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        SCinstance.get.mockRejectedValueOnce({
        }
        )

        expect(walletService.getBalance(10)).rejects.toThrowError(Error)
    })
})

describe("deposit", () => {
    const req = {
        amount: 500
    }
    it("deposits balance", async () => {
        const expectedRes = {
            
        }

        SCinstance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await walletService.deposit(10, req)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        SCinstance.post.mockRejectedValueOnce({
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

        expect(walletService.deposit(10, req)).rejects.toThrowError(ServerError)
        expect(walletService.deposit(10, req)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        SCinstance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(walletService.deposit(10, req)).rejects.toThrowError(ConnectionError)
        expect(walletService.deposit(10, req)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        SCinstance.post.mockRejectedValueOnce({
        }
        )

        expect(walletService.deposit(10, req)).rejects.toThrowError(Error)
    })
})

describe("getWallet", () => {
    it("returns wallet", async () => {
        const expectedRes = {
            address: "string",
        }

        SCinstance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await walletService.getWallet(10)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        SCinstance.get.mockRejectedValueOnce({
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

        expect(walletService.getWallet(10)).rejects.toThrowError(ServerError)
        expect(walletService.getWallet(10)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        SCinstance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(walletService.getWallet(10)).rejects.toThrowError(ConnectionError)
        expect(walletService.getWallet(10)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        SCinstance.get.mockRejectedValueOnce({
        }
        )

        expect(walletService.getWallet(10)).rejects.toThrowError(Error)
    })
})

describe("createWallet", () => {
    it("returns wallet", async () => {
        const expectedRes = {
            address: "string",
        }

        SCinstance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await walletService.createWallet(10)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        SCinstance.post.mockRejectedValueOnce({
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

        expect(walletService.createWallet(10)).rejects.toThrowError(ServerError)
        expect(walletService.createWallet(10)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        SCinstance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(walletService.createWallet(10)).rejects.toThrowError(ConnectionError)
        expect(walletService.createWallet(10)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        SCinstance.post.mockRejectedValueOnce({
        }
        )

        expect(walletService.createWallet(10)).rejects.toThrowError(Error)
    })
})

describe("getTeacherBalance", () => {
    it("returns teacher balance", async () => {
        const expectedRes = {
            balance: 500
        }

        SCinstance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await walletService.getTeacherBalance(10)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        SCinstance.get.mockRejectedValueOnce({
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

        expect(walletService.getTeacherBalance(10)).rejects.toThrowError(ServerError)
        expect(walletService.getTeacherBalance(10)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        SCinstance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(walletService.getTeacherBalance(10)).rejects.toThrowError(ConnectionError)
        expect(walletService.getTeacherBalance(10)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        SCinstance.get.mockRejectedValueOnce({
        }
        )

        expect(walletService.getTeacherBalance(10)).rejects.toThrowError(Error)
    })
})

describe("teacherWithdraw", () => {
    const expectedRes = {
        address: "string",
    }
    it("deposists balance into teachers adress", async () => {
        SCinstance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await walletService.teacherWithdraw(10, expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        SCinstance.post.mockRejectedValueOnce({
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

        expect(walletService.teacherWithdraw(10, expectedRes)).rejects.toThrowError(ServerError)
        expect(walletService.teacherWithdraw(10, expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        SCinstance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(walletService.teacherWithdraw(10, expectedRes)).rejects.toThrowError(ConnectionError)
        expect(walletService.teacherWithdraw(10, expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        SCinstance.post.mockRejectedValueOnce({
        }
        )

        expect(walletService.teacherWithdraw(10, expectedRes)).rejects.toThrowError(Error)
    })
})

describe("getOwnerBalance", () => {
    it("returns owner balance", async () => {
        const expectedRes = {
            balance: 500
        }

        SCinstance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await walletService.getOwnerBalance()
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        SCinstance.get.mockRejectedValueOnce({
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

        expect(walletService.getOwnerBalance()).rejects.toThrowError(ServerError)
        expect(walletService.getOwnerBalance()).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        SCinstance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(walletService.getOwnerBalance()).rejects.toThrowError(ConnectionError)
        expect(walletService.getOwnerBalance()).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        SCinstance.get.mockRejectedValueOnce({
        }
        )

        expect(walletService.getOwnerBalance()).rejects.toThrowError(Error)
    })
})

describe("ownerWithdraw", () => {
    const expectedRes = {
        address: "string",
    }
    it("deposists balance into owner adress", async () => {
        SCinstance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await walletService.ownerWithdraw(expectedRes)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        SCinstance.post.mockRejectedValueOnce({
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

        expect(walletService.ownerWithdraw(expectedRes)).rejects.toThrowError(ServerError)
        expect(walletService.ownerWithdraw(expectedRes)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        SCinstance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(walletService.ownerWithdraw(expectedRes)).rejects.toThrowError(ConnectionError)
        expect(walletService.ownerWithdraw(expectedRes)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        SCinstance.post.mockRejectedValueOnce({
        }
        )

        expect(walletService.ownerWithdraw(expectedRes)).rejects.toThrowError(Error)
    })
})