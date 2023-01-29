/** define user auth router */
const userAuthRouter = require("express").Router();
/** import user auth controller */
const {UserAuthController} = require("app/http/controllers/user/auth/user.auth.controller");

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
 *      parameters:
 *          - name: phone
 *            description: user phone number
 *            in: formData
 *            required: true
 *            type: string
 *      responses:
 *          201:
 *              description: OTP has been sent successfully
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              descriptions: Internal Server Error
 */
userAuthRouter.post("/get-otp", UserAuthController.getOTPProcess);

/**
 * @swagger
 * /user/auth/check-otp:
 *  post:
 *      summary: application users' check otp process
 *      description: check otp with code, phone number and expires date
 *      tags: [user-authentication]
 *      parameters:
 *          - name: phone
 *            description: user phone number
 *            in: formData
 *            required: true
 *            type: string
 *          - name: code
 *            description: user verification code
 *            in: formData
 *            required: true
 *            type: string
 *      responses:
 *          201:
 *              description: access token created successfully
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              descriptions: Internal Server Error
 */
userAuthRouter.post("/check-otp", UserAuthController.checkOTPProcess);

/** export router */
module.exports = {
    userAuthRouter
}