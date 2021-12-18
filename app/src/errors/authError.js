class AuthError extends Error {

    constructor(e, message) {
        // Pasa los argumentos restantes (incluidos los específicos del proveedor) al constructor padre
        super(message)
    
        // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, AuthError)
        }
    
        this.name = 'AuthError'
        // Información de depuración personalizada
        this.message = 'Error authenticating against auhorization service: ' + message
        this.date = new Date()
    }
}

module.exports = AuthError