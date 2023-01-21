/** import main controller */
const Controller = require("app/http/controllers/controller");

/**
 * application home class controller
 */
module.exports = new class HomeController extends Controller {
    /**
     * index page controller
     * @param req
     * @param res
     * @param next
     */
    indexPage(req, res, next) {
        try {
            /** send success response */
            this.sendSuccessResponse(req, res, 200, "index page data");
        } catch (err) {
            next(err)
        }
    }
}