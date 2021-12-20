const ConnectionError = require('../errors/connectionError')
const ServerError = require('../errors/serverError')

function handleError(error){
    if (error.response) {
        //custom errors for server status response
        parsedError = JSON.parse(JSON.stringify(error.response.data))
        let message = ''
        if (error.response.status == 422) {
            message = parsedError.detail[0].msg + ' | ' + parsedError.detail[0].loc + ' | ' + error.response.status
        } else {
            message = parsedError.detail + ' | ' + error.response.status
        }
        console.log("there was a response")
        console.log(message)
        throw new ServerError(error, message, error.response.status || 500)
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

function handleSCError(error){
    if (error.response) {
        //custom errors for server status response
        parsedError = JSON.parse(JSON.stringify(error.response.data))
        let message = parsedError.code
        console.log("there was a response")
        console.log(message)
        throw new ServerError(error, message, error.response.status || 500)
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

module.exports = { handleError, handleSCError }
