const ConnectionError = require('../errors/connectionError')
const ServerError = require('../errors/serverError')

function handleError(error){
    if (error.response) {
        //custom errors for server status response
        console.log("there was a response ")
        throw new ServerError(error, error.message, error.status || 500)
    } else if (error.request) {
        //custom error for unresponsive server
        console.log("no response from python service")
        throw new ConnectionError(error, 'Python Service is not responding')
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
        throw new Error(error)
    }
}

module.exports = handleError
