class ConnectionError extends Error {
    
    constructor(message) {
        // Pasa los argumentos restantes (incluidos los específicos del proveedor) al constructor padre
        super()
    
        // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, ConnectionError)
        }
    
        this.name = 'ConnectionError'
        // Información de depuración personalizada
        this.message = 'Error connecting to Python service'
        this.date = new Date()
    }
}