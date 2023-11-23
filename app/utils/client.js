/**
 * A helper function for that is responsible for handling the
 * global data that needed to be accessible in front end through ejs
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} An object containing the request.
 */
function clientHelper(req, res) {
    /** Returning an object containing the needed data */
    return {
        req
    };
}

module.exports = {
    clientHelper
};
