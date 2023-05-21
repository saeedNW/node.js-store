/**
 * @swagger
 *  components:
 *      parameters:
 *          UserSearchQuery:
 *              name: search
 *              in: query
 *              type: string
 *              schema:
 *                  type: string
 *              description: search query based on first_name last_name username phone email
 */

/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
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
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      description: user ObjectID
 *                                      example: 640d6eb5f4f1b2f8a1a55dd1
 *                                  first_name:
 *                                      type: string
 *                                      description: user first name
 *                                      example: "Saeed"
 *                                  last_name:
 *                                      type: string
 *                                      description: user last name
 *                                      example: "Norouzi"
 *                                  username:
 *                                      type: string
 *                                      description: user account user name
 *                                      example: "Snw13"
 *                                  phone:
 *                                      type: string
 *                                      description: user phone number
 *                                      example: 09175288456
 *                                  email:
 *                                      type: string
 *                                      description: user email address
 *                                      example: "saeednorouzi98@gmail.com"
 *                                  invoices:
 *                                      type: array
 *                                      description: user invoices list
 *                                      example: []
 *                                  discount:
 *                                      type: integer
 *                                      description: user discount
 *                                      example: 23
 *                                  birthdate:
 *                                      type: string
 *                                      format: date
 *                                      description: user birthdate
 *                                      example: "2023-05-19T05:38:38.434Z"
 *                                  roles:
 *                                      type: array
 *                                      description: user roles list
 *                                      items:
 *                                          type: string
 *                                          example: ADMIN
 *                                  courses:
 *                                      type: array
 *                                      description: user courses list
 *                                      example: []
 *                                  createdAt:
 *                                      type: string
 *                                      format: date
 *                                      description: user creation date
 *                                      example: "2023-05-19T05:38:38.434Z"
 *                                  updatedAt:
 *                                      type: string
 *                                      format: date
 *                                      description: user las data update date
 *                                      example: "2023-05-19T05:38:38.434Z"
 */

/**
 * @swagger
 *  /admin/users/list:
 *      get:
 *          summary: get all users data
 *          tags: [AdminPanel(users)]
 *          parameters:
 *              -   $ref: '#/components/parameters/UserSearchQuery'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'
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