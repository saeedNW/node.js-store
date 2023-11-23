/** define supports router */
const supportsRouter = require("express").Router();
/** import support controller */
const {SupportController} = require("app/http/controllers/support/support.controller");
/** import namespace router */
const {namespaceRouter} = require("./namespace.router");
/** import room router */
const {roomRouter} = require("./room.router");
/** import login access checker middleware */
const {checkAccessLogin, checkLogin} = require('app/http/middlewares/auth.middleware');

/** initialize namespace router */
supportsRouter.use('/namespace', namespaceRouter);
/** initialize room router */
supportsRouter.use('/room', roomRouter);

/** support login process routes (login page request) */
supportsRouter.get("/login", checkAccessLogin, SupportController.loginPage);
/** support login process routes (login process request) */
supportsRouter.post("/login", checkAccessLogin, SupportController.loginHandler);
/** support chat page render route */
supportsRouter.get('/', checkLogin, SupportController.renderChatRoom);

/** export router */
module.exports = {
    supportsRouter
}