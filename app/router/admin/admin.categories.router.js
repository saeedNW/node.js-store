/** define admin categories router */
const adminCategoriesRouter = require("express").Router();
/** import admin categories controller */
const {AdminCategoryController} = require("app/http/controllers/admin/category/admin.category.controller");

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCategory:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: new category title
 *                  parent:
 *                      type: string
 *                      description: the id of the new category's parent category
 *          SuccessResponse:
 *              type: object
 *              properties:
 *                  status:
 *                      type: integer
 *                      description: response status code
 *                      default: 200/201
 *                  success:
 *                      type: boolean
 *                      description: define process ending status
 *                      default: true
 *                  message:
 *                      type: string
 *                      description: response message
 *                  data:
 *                      type: object
 *                      description: response data, in case of returning/creating data
 *      parameters:
 *          CategoryId:
 *              name: categoryId
 *              in: path
 *              type: string
 *              required: true
 *              schema:
 *                  type: string
 *              description: category ObjectId
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          summary: application admin category creation process
 *          description: create new category as parent or child with title and parent
 *          tags: [AdminPanel(category)]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCategory'
 *          responses:
 *              201:
 *                  description: category created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/SuccessResponse'
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
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
 *      tags: [AdminPanel(category)]
 *      parameters:
 *          -   $ref: '#/components/parameters/CategoryId'
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: forbidden
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
 *      tags: [AdminPanel(category)]
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: forbidden
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
 *      tags: [AdminPanel(category)]
 *      parameters:
 *          -   $ref: '#/components/parameters/CategoryId'
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: forbidden
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
 *      tags: [AdminPanel(category)]
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: forbidden
 *          500:
 *              description: Internal server error
 */
adminCategoriesRouter.get("/parents", AdminCategoryController.getParentCategories);

/**
 * @swagger
 * /admin/category/children/{categoryId}:
 *  get:
 *      summary: get children categories
 *      description: get categories that has a parent category
 *      tags: [AdminPanel(category)]
 *      parameters:
 *          -   $ref: '#/components/parameters/CategoryId'
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: forbidden
 *          422:
 *              description: validation error
 *          500:
 *              description: Internal server error
 */
adminCategoriesRouter.get("/children/:categoryId", AdminCategoryController.getChildCategories);

/** export router */
module.exports = {
    adminCategoriesRouter
}