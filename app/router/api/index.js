/**
 * import express router
 * define home router
 */
const indexRouter = require("express").Router();
/** import home controller */
const HomeController = require("app/http/controllers/api/home.controller");

/**
 * @swagger
 * tags:
 *  name: public
 *  description: application public api routes
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: application index page route
 *      description: get application index page data
 *      tags: [public]
 *      responses:
 *          200:
 *              description: request ended successfully
 *          404:
 *              description: data notfound
 *          500:
 *              description: server internal error
 */
indexRouter.get("/", HomeController.indexPage);

module.exports = {
    indexRouter
}