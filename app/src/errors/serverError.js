class ServerError extends Error {
    
    constructor(e, message, status) {
        // Pasa los argumentos restantes (incluidos los específicos del proveedor) al constructor padre
        super(message)
    
        // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, ServerError)
        }
    
        this.name = 'ServerError'
        // Información de depuración personalizada
        this.message = 'Error with the server: ' + message
        this.status = status
        this.date = new Date()
    }
}

module.exports = ServerError