const verifyIdToken = require('../../src/middlewares/firebase')
const AuthError = require('../../src/errors/authError')

describe("Firebase authenticator", () => {
    it("Throws AuthError when token is invalid", () => {
        expect(verifyIdToken("Bad Token")).rejects.toThrowError(AuthError)
    })

    //TODO: parece que para testear los casos buenos hay que instalar una herramienta de firebase...
})