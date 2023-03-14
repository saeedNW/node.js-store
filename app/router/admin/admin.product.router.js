/** define admin product router */
const adminProductRouter = require("express").Router();
/** import admin product controller */
const {AdminProductController} = require("app/http/controllers/admin/product/admin.product.controller");

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
 *                      type: file
 *                      description: product images
 *                  tags:
 *                      type: array
 *                      description: product tags
 *                  category:
 *                      type: string
 *                      description: product category _id
 *                  price:
 *                      type: number
 *                      description: product price, in case of free product just leaves it blank
 *                  discount:
 *                      type: number
 *                      description: product discounted price
 *                  count:
 *                      type: number
 *                      description: number of products available
 *                      default: 10
 *                  productType:
 *                      type: string
 *                      description: product type, virtual or physical
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
adminProductRouter.post("/new", AdminProductController.addProduct);

adminProductRouter.patch("/edit/:productId", AdminProductController.updateProduct);

adminProductRouter.delete("/remove/:productId", AdminProductController.removeProduct);

adminProductRouter.get("/all", AdminProductController.getAllProducts);

adminProductRouter.get("/single/:productId", AdminProductController.getSingleProduct);

module.exports = {
    adminProductRouter
}