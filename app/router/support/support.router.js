/** define supports router */
const supportsRouter = require("express").Router();
/** import support controller */
const {SupportController} = require("app/http/controllers/support/support.controller");
/** import namespace router */
const {namespaceRouter} = require("./namespace.router");
/** import room router */
const {roomRouter} = require("./room.router");

/** initialize namespace router */
supportsRouter.use('/namespace', namespaceRouter);
/** initialize room router */
supportsRouter.use('/room', roomRouter);

/** support chat page render route */
supportsRouter.get('/', SupportController.renderChatRoom);

/** export router */
module.exports = {
    supportsRouter
}