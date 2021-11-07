class ServerEror extends Error {
    
    constructor(e, message) {
        // Pasa los argumentos restantes (incluidos los específicos del proveedor) al constructor padre
        super(e)
    
        // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, ServerEror)
        }
    
        this.name = 'ServerEror'
        // Información de depuración personalizada
        this.message = 'Error with the server: ' + message
        this.date = new Date()
    }
}

module.exports = ServerEror