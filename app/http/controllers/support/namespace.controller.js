/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import chat model */
const {chatModel} = require("app/models");
/** import http status codes module */
const httpStatus = require("http-status-codes");
/** import http-error module */
const createHttpError = require("http-errors");

/**
 * conversation namespaces class controller
 */
class NamespaceController extends Controller {
    /**
     * add new namespace process
     * @param {object} req - express request object
     * @param {object} res - express response object
     * @param next express next function
     * @returns {Promise<void>}
     */
    async addNamespace(req, res, next) {
        try {
            /** extract data from request body */
            const {title, endpoint} = req.body;

            /** check for duplicated namespace */
            await this.findNamespaceWithEndpoint(endpoint);

            /** create new conversation */
            const conversation = await chatModel.create({title, endpoint});

            /** return error if the creation process failed */
            if (!conversation) {
                throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
            }

            /** return success message */
            return this.sendSuccessResponse(req, res, httpStatus.CREATED);
        } catch (err) {
            next(err);
        }
    }

    /**
     * retrieve namespaces list
     * @param {object} req - express request object
     * @param {object} res - express response object
     * @param next express next function
     * @returns {Promise<void>}
     */
    async retrieveNamespaces(req, res, next) {
        try {
            /** retrieve conversations from database */
            const conversations = await chatModel.find({}, {'room': 0});

            /** return success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {conversations});
        } catch (err) {
            next(err);
        }
    }

    /**
     * check for namespace existence using its endpoint
     * @param {string} endpoint - namespace endpoint
     * @returns {Promise<boolean>}
     */
    async findNamespaceWithEndpoint(endpoint) {
        /** check for namespace existence in database */
        const conversation = await chatModel.exists({endpoint});
        /** throw error if namespace was found */
        if (conversation) throw new createHttpError.BadRequest("این اسم قبلا انتخاب شده است");
        /** return true if the namespace was not found */
        return true;
    }
}

module.exports = {
    NamespaceController: new NamespaceController()
}