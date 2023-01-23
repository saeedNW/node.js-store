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
 * /user/auth/login:
 *  post:
 *      summary: application users' login router
 *      description: users' login process with phone number and OPT
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
userAuthRouter.post("/login", UserAuthController.loginProcess);

/** export router */
module.exports = {
    userAuthRouter
}