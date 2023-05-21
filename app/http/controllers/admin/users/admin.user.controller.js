/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import models */
const {userModel} = require("app/models");
/** import http status codes module */
const httpStatus = require("http-status-codes");
/** import http-error module */
const createError = require("http-errors");


/**
 * @class AdminUserController
 */
class AdminUserController extends Controller {
    /**
     * get all users
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async getAllUsers(req, res, next) {
        try {
            /** extract search query from request */
            const {search} = req.query;
            /** define database query */
            const databaseQuery = {};
            /** add search options to the database query if search was defined */
            if (search) databaseQuery['$text'] = {$search: search};
            /** get all users data */
            const users = await userModel.find({...databaseQuery}, {opt: 0, __v: 0});
            /** send the success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {users});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    AdminUserController: new AdminUserController()
}