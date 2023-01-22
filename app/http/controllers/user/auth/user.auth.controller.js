/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import user auth validator schema */
const {getOtpSchema} = require("app/http/validators/user/auth.schema");
/** import http-error module */
const createError = require("http-errors");

/**
 * @class UserAuthController
 */
class UserAuthController extends Controller {
    /**
     * user login process controller
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async loginProcess(req, res, next) {
        try {
            /**
             * user input validation
             * @type {*}
             */
            const validationResult = await getOtpSchema.validateAsync(req.body);

            /**
             * send success message
             */
            this.sendSuccessResponse(req, res, 200, "شما با موفقیت وارد حساب خود شدید");
        } catch (err) {
            next(createError.BadRequest(err.message));
        }
    }
}

module.exports = {
    UserAuthController: new UserAuthController()
}