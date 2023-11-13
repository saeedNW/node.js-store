/** import main controller */
const Controller = require("app/http/controllers/controller");

/**
 * Application support controller
 */
class SupportController extends Controller {
    /**
     * render chat room page
     * @param {object} req - express request object
     * @param {object} res - express response object
     * @param next express next function
     * @returns {Promise<void>}
     */
    async renderChatRoom(req, res, next) {
        try {
            return res.render('pages/chat');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    SupportController: new SupportController()
}