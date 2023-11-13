/** define supports router */
const supportsRouter = require("express").Router();
/** import support controller */
const {SupportController} = require("app/http/controllers/support/support.controller");

/** support chat page render route */
supportsRouter.get('/', SupportController.renderChatRoom);

/** export router */
module.exports = {
    supportsRouter
}