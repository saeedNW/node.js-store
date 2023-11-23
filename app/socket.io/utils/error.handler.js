/** import http-error module */
const createHttpError = require("http-errors");

/**
 * socket error handler
 * @param {object} socket - socket data object
 * @param {object} error - error data object
 */
function socketErrorHandler(socket, error) {
    /**
     * define server internal error
     */
    const serverError = new createHttpError.InternalServerError('error_500_server_internal_error');

    /**
     * define error status
     * @type {*|number}
     */
    const status = error?.status || serverError.status;

    /**
     * define error message
     * @type {*|string}
     */
    const message = error?.message || serverError.message;

    /** emit error */
    socket.emit('receive-error', {
        status,
        success: false,
        message,
    });

    return false;
}

module.exports = {socketErrorHandler}