/**
 * @swagger
 *  definitions:
 *      ListOfPermissions:
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
 *                      permissions:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      description: permission ObjectID
 *                                      example: 640d6eb5f4f1b2f8a1a55dd1
 *                                  title:
 *                                      type: string
 *                                      description: permission title
 *                                      example: "show-single-user"
 *                                  label:
 *                                      type: string
 *                                      description: permission label
 *                                      example: "show single user data"
 */

/**
 * @swagger
 *  /admin/permissions/list:
 *      get:
 *          summary: list of permissions
 *          tags: [AdminPanel(permissions)]
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfPermissions'
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