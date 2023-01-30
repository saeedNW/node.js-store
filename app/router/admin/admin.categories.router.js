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

/**
 * @swagger
 * /admin/category/remove/{categoryId}:
 *  delete:
 *      summary: remove single category
 *      description: remove single category by id
 *      tags: [admin-category]
 *      parameters:
 *          -   name: categoryId
 *              description: category ObjectId
 *              in: path
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: data notfound
 *          422:
 *              description: validation error
 *          500:
 *              description: Internal server error
 */
adminCategoriesRouter.delete("/remove/:categoryId", AdminCategoryController.removeCategory);

/**
 * @swagger
 * /admin/category/all:
 *  get:
 *      summary: get all application categories
 *      description: get application all categories
 *      tags: [admin-category]
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */
adminCategoriesRouter.get("/all", AdminCategoryController.getAllCategories);

/**
 * @swagger
 * /admin/category/single/{categoryId}:
 *  get:
 *      summary: get single category
 *      description: get single category by id
 *      tags: [admin-category]
 *      parameters:
 *          -   name: categoryId
 *              description: category ObjectId
 *              in: path
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          422:
 *              description: validation error
 *          500:
 *              description: Internal server error
 */
adminCategoriesRouter.get("/single/:categoryId", AdminCategoryController.getCategoryById);

/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      summary: get parent categories
 *      description: get categories with child
 *      tags: [admin-category]
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */
adminCategoriesRouter.get("/parents", AdminCategoryController.getParentCategories);

/**
 * @swagger
 * /admin/category/children/{parentId}:
 *  get:
 *      summary: get children categories
 *      description: get categories that has a parent category
 *      tags: [admin-category]
 *      parameters:
 *          -   name: parentId
 *              description: categories parent ObjectId
 *              in: path
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          422:
 *              description: validation error
 *          500:
 *              description: Internal server error
 */
adminCategoriesRouter.get("/children/:parentId", AdminCategoryController.getChildCategories);

/** export router */
module.exports = {
    adminCategoriesRouter
}