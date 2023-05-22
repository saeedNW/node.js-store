/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import models */
const {permissionsModel} = require("app/models");
/** import http status codes module */
const httpStatus = require("http-status-codes");

/**
 * @class AdminPermissionController
 */
class AdminPermissionController extends Controller {
    /**
     * get permissions list
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async getPermissionsList(req, res, next) {
        try {
            /** get roles data from database */
            const permissions = await permissionsModel.find({}, {_id: 1, title: 1, label: 1});
            /** return success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {permissions});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    AdminPermissionController: new AdminPermissionController()
}