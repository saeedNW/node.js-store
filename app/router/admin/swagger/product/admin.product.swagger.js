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
 *                      $ref: '#/components/schemas/Colors'
 *                  model:
 *                      type: string
 *                      description: product model name
 *                      default: test121
 *                  made_in:
 *                      type: string
 *                      description: product manufacturing Country
 *                      default: ایران
 */

/**
 * @swagger
 *  components:
 *      schemas:
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
 *                      $ref: '#/components/schemas/Colors'
 *                  model:
 *                      type: string
 *                      description: product model name
 *                      default: test121
 *                  made_in:
 *                      type: string
 *                      description: product manufacturing Country
 *                      default: ایران
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Colors:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 */

/**
 * @swagger
 *  components:
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */

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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */

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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Unauthorized'
 *          403:
 *              description: forbidden
 *          404:
 *              description: data notfound
 *          422:
 *              description: validation error
 *          500:
 *              description: Internal server error
 */

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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Unauthorized'
 *          403:
 *              description: forbidden
 *          500:
 *              description: Internal server error
 */

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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Unauthorized'
 *          403:
 *              description: forbidden
 *          422:
 *              description: validation error
 *          500:
 *              description: Internal server error
 */