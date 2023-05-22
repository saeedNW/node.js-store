/**
 * @swagger
 *  components:
 *      schemas:
 *          AddNewRole:
 *              type: object
 *              required:
 *                  -   title
 *                  -   label
 *                  -   permissions
 *              properties:
 *                  title:
 *                      type: string
 *                      description: role title
 *                      example: "supper-admin"
 *                  label:
 *                      type: string
 *                      description: role label
 *                      example: "Super admin"
 *                  permissions:
 *                      type: array
 *                      description: role permissions list [an array of permissions -id]
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: true
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "your request ended successfully"
 *              data:
 *                  type: object
 *                  properties:
 *                      roles:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      description: role ObjectID
 *                                      example: 640d6eb5f4f1b2f8a1a55dd1
 *                                  title:
 *                                      type: string
 *                                      description: role title
 *                                      example: "supper-admin"
 *                                  label:
 *                                      type: string
 *                                      description: role label
 *                                      example: "Super admin"
 *                                  permissions:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  description: permission ObjectID
 *                                                  example: 640d6eb5f4f1b2f8a1a55dd1
 *                                              title:
 *                                                  type: string
 *                                                  description: permission title
 *                                                  example: "show-single-user"
 *                                              label:
 *                                                  type: string
 *                                                  description: permission label
 *                                                  example: "show single user data"
 */

/**
 * @swagger
 *  /admin/roles/list:
 *      get:
 *          summary: list of roles
 *          tags: [AdminPanel(roles)]
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRoles'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Forbidden'
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/roles/new:
 *      post:
 *          summary: add new role
 *          tags: [AdminPanel(roles)]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddNewRole'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddNewRole'
 *          responses:
 *              201:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DefaultCreate'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Forbidden'
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */
