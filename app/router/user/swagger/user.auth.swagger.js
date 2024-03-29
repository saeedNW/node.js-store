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
 */

/**
 * @swagger
 *  components:
 *      schemas:
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
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: user refresh token
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
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal Server Error
 */

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
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal Server Error
 */

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
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal Server Error
 */
