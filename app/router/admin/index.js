/**
 * import express router
 * define admin main router
 */
const adminMainRouter = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: AdminPanel(Blog)
 *          description: admin blogs creation and management
 *      -   name: AdminPanel(category)
 *          description: admin categories creation and management
 *      -   name: AdminPanel(product)
 *          description: admin products creation and management
 */

/** import admin category router */
const {adminCategoriesRouter} = require("./admin.categories.router");
/** initialize admin category router */
adminMainRouter.use("/category", adminCategoriesRouter);

/** import admin blog router */
const {adminBlogRouter} = require("./admin.blog.router");
/** initialize admin blog router */
adminMainRouter.use("/blogs", adminBlogRouter);

/** import admin product router */
const {adminProductRouter} = require("./admin.product.router");
/** initialize admin blog router */
adminMainRouter.use("/products", adminProductRouter);

/** export router */
module.exports = {
    adminMainRouter
}