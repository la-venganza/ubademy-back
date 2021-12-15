const subscriptionService = require('../../src/middlewares/subscriptionService')
const instance = require('../../src/utils/axiosHelper')
const ConnectionError = require('../../src/errors/connectionError')
const ServerError = require('../../src/errors/serverError')

jest.mock('../../src/utils/axiosHelper')

describe("getSubscription", () => {
    it("returns subscription", async () => {
        const expectedRes = {
            "results": [
                {
                    "active": true,
                    "end_date": "2021-12-15",
                    "subscription": {
                        "id": 0,
                        "title": "string"
                    },
                    "start_date": "2021-12-15"
                }
            ]
        }

        instance.get.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await subscriptionService.getSubscription(1)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.get.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(subscriptionService.getSubscription(1)).rejects.toThrowError(ServerError)
        expect(subscriptionService.getSubscription(1)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.get.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(subscriptionService.getSubscription(1)).rejects.toThrowError(ConnectionError)
        expect(subscriptionService.getSubscription(1)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.get.mockRejectedValueOnce({
        }
        )

        expect(subscriptionService.getSubscription(1)).rejects.toThrowError(Error)
    })
})

describe("createSubscription", () => {
    const sentReq = {
        "subscription": "string",
        "end_date": "2021-12-15"
      }
    it("posts subscription", async () => {
        const expectedRes = {
            "active": true,
            "end_date": "2021-12-15",
            "subscription": {
              "id": 0,
              "title": "string"
            },
            "start_date": "2021-12-15"
          }

        instance.post.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await subscriptionService.createSubscription(sentReq, 1)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.post.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(subscriptionService.createSubscription(sentReq, 1)).rejects.toThrowError(ServerError)
        expect(subscriptionService.createSubscription(sentReq, 1)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.post.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(subscriptionService.createSubscription(sentReq, 1)).rejects.toThrowError(ConnectionError)
        expect(subscriptionService.createSubscription(sentReq, 1)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.post.mockRejectedValueOnce({
        }
        )

        expect(subscriptionService.createSubscription(sentReq, 1)).rejects.toThrowError(Error)
    })
})

describe("patchSubscription", () => {
    const sentReq = {
        "subscription": "string",
        "end_date": "2021-12-15"
      }
    it("patches subscription", async () => {
        const expectedRes = {
            "active": true,
            "end_date": "2021-12-15",
            "subscription": {
              "id": 0,
              "title": "string"
            },
            "start_date": "2021-12-15"
          }

        instance.patch.mockResolvedValue({
            data: expectedRes
        }
        )

        const res = await subscriptionService.patchSubscription(sentReq, 1)
        expect(res).toEqual(expectedRes)
    })

    it("throws ServerError", async () => {
        instance.patch.mockRejectedValueOnce({
            response: "has response",
            message: "message"
        }
        )

        expect(subscriptionService.patchSubscription(sentReq, 1)).rejects.toThrowError(ServerError)
        expect(subscriptionService.patchSubscription(sentReq, 1)).rejects.toThrowError("message")
    })

    it("throws ConnectionError", async () => {
        instance.patch.mockRejectedValueOnce({
            request: "has request",
            message: "message"
        }
        )

        expect(subscriptionService.patchSubscription(sentReq, 1)).rejects.toThrowError(ConnectionError)
        expect(subscriptionService.patchSubscription(sentReq, 1)).rejects.toThrowError("message")
    })

    it("throws Error", async () => {
        instance.patch.mockRejectedValueOnce({
        }
        )

        expect(subscriptionService.patchSubscription(sentReq, 1)).rejects.toThrowError(Error)
    })
})
