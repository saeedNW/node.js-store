/** define admin product router */
const adminProductRouter = require("express").Router();
/** import admin product controller */
const {AdminProductController} = require("app/http/controllers/admin/product/admin.product.controller");
/** import file uploader */
const {uploadFile} = require("app/utils/multer");
/** import string to array convertor */
const {stringToArray} = require("app/http/middlewares/string.to.array.middleware");

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddProduct:
 *              type: object
 *              required:
 *                  -   title
 *                  -   summary
 *                  -   description
 *                  -   images
 *                  -   tags
 *                  -   category
 *                  -   count
 *                  -   productType
 *              properties:
 *                  title:
 *                      type: string
 *                      description: product title
 *                  summary:
 *                      type: string
 *                      description: short summery about product
 *                  description:
 *                      type: string
 *                      description: product full description
 *                  images:
 *                      type: array
 *                      description: product images
 *                      items:
 *                          type: string
 *                          format: binary
 *                  tags:
 *                      type: array
 *                      description: product tags
 *                  category:
 *                      type: string
 *                      description: product category _id
 *                  price:
 *                      type: number
 *                      description: product price, in case of free product just leaves it blank
 *                      default: 2412
 *                  discount:
 *                      type: number
 *                      description: product discounted price
 *                      default: 21
 *                  count:
 *                      type: number
 *                      description: number of products available
 *                      default: 10
 *                  productType:
 *                      type: string
 *                      description: product type, virtual or physical
 *                  height:
 *                      type: string
 *                      description: product boxing height
 *                      default: 0
 *                  weight:
 *                      type: string
 *                      description: product boxing weight
 *                      default: 0
 *                  width:
 *                      type: string
 *                      description: product boxing width
 *                      default: 0
 *                  length:
 *                      type: string
 *                      description: product boxing length
 *                      default: 0
 *                  colors:
 *                      type: array
 *                      description: product colors
 *                  model:
 *                      type: string
 *                      description: product model name
 *                      default: test121
 *                  made_in:
 *                      type: string
 *                      description: product manufacturing Country
 *                      default: ایران
 *          EditProduct:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: product title
 *                  summary:
 *                      type: string
 *                      description: short summery about product
 *                  description:
 *                      type: string
 *                      description: product full description
 *                  images:
 *                      type: array
 *                      description: product images
 *                      items:
 *                          type: string
 *                          format: binary
 *                  tags:
 *                      type: array
 *                      description: product tags
 *                  category:
 *                      type: string
 *                      description: product category _id
 *                  price:
 *                      type: number
 *                      description: product price, in case of free product just leaves it blank
 *                      default: 2412
 *                  discount:
 *                      type: number
 *                      description: product discounted price
 *                      default: 21
 *                  count:
 *                      type: number
 *                      description: number of products available
 *                      default: 10
 *                  productType:
 *                      type: string
 *                      description: product type, virtual or physical
 *                  height:
 *                      type: string
 *                      description: product boxing height
 *                      default: 0
 *                  weight:
 *                      type: string
 *                      description: product boxing weight
 *                      default: 0
 *                  width:
 *                      type: string
 *                      description: product boxing width
 *                      default: 0
 *                  length:
 *                      type: string
 *                      description: product boxing length
 *                      default: 0
 *                  colors:
 *                      type: array
 *                      description: product colors
 *                  model:
 *                      type: string
 *                      description: product model name
 *                      default: test121
 *                  made_in:
 *                      type: string
 *                      description: product manufacturing Country
 *                      default: ایران
 *      parameters:
 *          ProductID:
 *              name: productId
 *              in: path
 *              type: string
 *              required: true
 *              schema:
 *                  type: string
 *              description: product ObjectId
 */

/**
 * @swagger
 *  /admin/products/new:
 *      post:
 *          summary: add new product
 *          description: creating new sale product
 *          tags: [AdminPanel(product)]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddProduct'
 *          responses:
 *              201:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */
adminProductRouter.post("/new", uploadFile.array("images", 10), stringToArray("tags"), stringToArray("colors"), AdminProductController.addProduct);


/**
 * @swagger
 *  /admin/products/edit/{productId}:
 *      patch:
 *          summary: add new product
 *          description: creating new sale product
 *          tags: [AdminPanel(product)]
 *          parameters:
 *              -   $ref: '#/components/parameters/ProductID'
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditProduct'
 *          responses:
 *              201:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */
adminProductRouter.patch("/edit/:productId", uploadFile.array("images", 10), stringToArray("tags"), stringToArray("colors"), AdminProductController.updateProduct);

/**
 * @swagger
 * /admin/products/remove/{productId}:
 *  delete:
 *      summary: remove single product
 *      description: remove single product by id
 *      tags: [AdminPanel(product)]
 *      parameters:
 *          -   $ref: '#/components/parameters/ProductID'
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
adminProductRouter.delete("/remove/:productId", AdminProductController.removeProduct);

/**
 * @swagger
 * /admin/products/all:
 *  get:
 *      summary: get all products
 *      description: get all products
 *      tags: [AdminPanel(product)]
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
adminProductRouter.get("/all", AdminProductController.getAllProducts);

/**
 * @swagger
 * /admin/products/single/{productId}:
 *  get:
 *      summary: get single product
 *      description: get single product by id
 *      tags: [AdminPanel(product)]
 *      parameters:
 *          -   $ref: '#/components/parameters/ProductID'
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
adminProductRouter.get("/single/:productId", AdminProductController.getSingleProduct);

module.exports = {
    adminProductRouter
}