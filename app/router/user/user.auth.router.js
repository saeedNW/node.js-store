/** define user auth router */
const userAuthRouter = require("express").Router();
/** import user auth controller */
const {UserAuthController} = require("app/http/controllers/user/auth/user.auth.controller");

/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   phone
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: user phone number
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   phone
 *                  -   code
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: user phone number
 *                  code:
 *                      type: integer
 *                      description: user verification code
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: user refresh token
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
 */

/**
 * @swagger
 * tags:
 *  name: user-authentication
 *  description: users authentication routes
 */

/**
 * @swagger
 * /user/auth/get-otp:
 *  post:
 *      summary: application users' otp creation process
 *      description: create otp code and send to user's phone number
 *      tags: [user-authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/GetOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/GetOTP'
 *      responses:
 *          200:
 *              description: OTP has been sent successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessResponse'
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal Server Error
 */
userAuthRouter.post("/get-otp", UserAuthController.getOTPProcess);

/**
 * @swagger
 * /user/auth/check-otp:
 *  post:
 *      summary: application users' check otp process
 *      description: check otp with code, phone number and expires date
 *      tags: [user-authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *      responses:
 *          201:
 *              description: access token created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessResponse'
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal Server Error
 */
userAuthRouter.post("/check-otp", UserAuthController.checkOTPProcess);

/**
 * @swagger
 * /user/auth/refresh-token:
 *  post:
 *      summary: refresh token verification
 *      description: check refresh token and regenerate access and refresh token
 *      tags: [user-authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *      responses:
 *          201:
 *              description: access and refresh tokens created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessResponse'
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal Server Error
 */
userAuthRouter.post("/refresh-token", UserAuthController.refreshTokenGenerator);

/** export router */
module.exports = {
    userAuthRouter
}