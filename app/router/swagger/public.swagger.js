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
 *      DefaultCreate:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 201
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