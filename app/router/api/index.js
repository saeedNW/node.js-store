/**
 * import express router
 * define home router
 */
const indexRouter = require("express").Router();
/** import home controller */
const HomeController = require("app/http/controllers/api/home.controller");

/** define index get router */
indexRouter.get("/", HomeController.indexPage);

module.exports = {
    indexRouter
}