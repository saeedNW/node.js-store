/** import autoBind module */
const autoBind = require("auto-bind");

/**
 * main controller class
 */
module.exports = class Controller {
    /**
     * main controller constructor
     */
    constructor() {
        /** initialize auto bind module */
        autoBind(this);
    }

    /**
     * create and throw errors
     * @param {string} message error message
     * @param {number} status error status
     */
    throwNewError(message, status = 500) {
        const error = new Error(message);
        error.status = status;
        throw error;
    }

    /**
     * send successful response to user
     * @param req express request method
     * @param res express response method
     * @param status success response status
     * @param message success response message
     * @param data success response data
     */
    sendSuccessResponse(req, res, status, message = null, data = {}) {
        res.status(status).json({
            status,
            success: true,
            message: message || "درخواست شما با موفقیت به اتمام رسید",
            data,
        })
    }
}