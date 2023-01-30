/** define admin categories router */
const adminCategoriesRouter = require("express").Router();
/** import admin categories controller */
const {AdminCategoryController} = require("app/http/controllers/admin/category/admin.category.controller");

/**
 * @swagger
 * tags:
 *  name: admin-category
 *  description: admin categories routes
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          summary: application admin category creation process
 *          description: create new category as parent or child with title and parent
 *          tags: [admin-category]
 *          parameters:
 *              -   name: title
 *                  description: new category title
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: parent
 *                  description: new category title
 *                  in: formData
 *                  required: false
 *                  type: string
 *          responses:
 *              201:
 *                  description: category created successfully
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */
adminCategoriesRouter.post("/add", AdminCategoryController.addCategory);

/** export router */
module.exports = {
    adminCategoriesRouter
}