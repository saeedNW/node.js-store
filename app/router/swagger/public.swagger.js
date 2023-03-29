/**
 * @swagger
 *  tags:
 *      -   name: AdminPanel(Blog)
 *          description: admin blogs creation and management
 *      -   name: AdminPanel(category)
 *          description: admin categories creation and management
 *      -   name: AdminPanel(product)
 *          description: admin products creation and management
 *      -   name: AdminPanel(course)
 *          description: admin course creation and management
 */

/**
 * @swagger
 *  tags:
 *      -   name: user-authentication
 *          description: users authentication routes
 */

/**
 * @swagger
 *  definitions:
 *      DefaultSuccess:
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
 */

/**
 * @swagger
 *  definitions:
 *      Unauthorized:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 401
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: false
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "please login to your account"
 */

/**
 * @swagger
 *  definitions:
 *      Forbidden:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 403
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: false
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "access denied"
 */