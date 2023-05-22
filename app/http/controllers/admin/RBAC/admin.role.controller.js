/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import models */
const {rolesModel} = require("app/models");
/** import http-error module */
const createError = require("http-errors");
/** import http status codes module */
const httpStatus = require("http-status-codes");

/**
 * @class AdminRoleController
 */
class AdminRoleController extends Controller {
    /**
     * get roles list
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async getRolesList(req, res, next) {
        try {
            /** get roles data from database */
            const roles = await rolesModel.find({});
            /** return success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {roles});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    AdminRoleController: new AdminRoleController()
}