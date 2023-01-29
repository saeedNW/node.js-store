/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import user auth validator schema */
const {getOtpSchema, checkOtpSchema} = require("app/http/validators/user/auth.schema");
/** import http-error module */
const createError = require("http-errors");
/** import helper functions */
const {randomNumberGenerator, signAccessToken} = require("app/utils/functions");
/** import models */
const {userModel} = require("app/models");
/** import constants */
const {userConstants} = require("app/utils/constans");

/**
 * @class UserAuthController
 */
class UserAuthController extends Controller {
    /**
     * user login process controller
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getOTPProcess(req, res, next) {
        /**
         * get user phone number and fix persian and arabic numbers
         * @type {string}
         */
        const phone = this.fixNumbers(req.body.phone);

        try {
            /**
             * user input validation
             */
            await getOtpSchema.validateAsync(req.body);

            /**
             * generate a random 5 digit number for phone verification
             * @type {number}
             */
            const code = randomNumberGenerator();

            /**
             * save/update user in database
             * @type {*}
             */
            const user = await this.saveUser(phone, code);

            /** return error if user creation failed */
            if (!user)
                throw createError.Unauthorized("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

            /**
             * send success message
             */
            this.sendSuccessResponse(req, res, 200, "کد اعتبار سنجی با موفقیت ارسال شد", {code, phone});
        } catch (err) {
            next(err);
        }
    }

    async checkOTPProcess(req, res, next) {
        try {
            /**
             * user input validation
             */
            await checkOtpSchema.validateAsync(req.body);

            /**
             * get user phone number and fix persian and arabic numbers
             * @type {string}
             */
            const phone = this.fixNumbers(req.body.phone);
            /**
             * get user verification code and fix persian and arabic numbers
             * @type {string}
             */
            const code = this.fixNumbers(req.body.code);

            /** get user data from database */
            const user = await userModel.findOne({phone});

            /** return error if user was not found */
            if (!user)
                throw createError.NotFound("کاربری با این شماره تماس یافت نشد");

            /** return error if user otp was not correct */
            if (user.otp.code !== code)
                throw createError.Unauthorized("کد وارد شده صحیح نمی باشد");

            /**
             * get current date
             * @type {Date}
             */
            const now = new Date();

            /** return error if otp was expired */
            if (user.otp.expires < now)
                throw createError.Unauthorized("کد وارد شده فاقد اعتبار می باشد");

            /**
             * create user access token
             * @type {*}
             */
            const accessToken = await signAccessToken(user._id);

            this.sendSuccessResponse(req, res, 200, undefined, {accessToken});
        } catch (err) {
            next(err);
        }
    }

    /**
     * save/update user in database
     * @param phone user phone number
     * @param code user verification code
     * @returns {Promise<*>}
     */
    async saveUser(phone, code) {
        /**
         * define opt option data
         * @type {{expires: *, code}}
         */
        const otp = {
            code,
            expires: userConstants.EXPIRES
        }

        /**
         * check user existence
         * @type {boolean}
         */
        const userExistence = await this.checkUserExistence(phone);

        /**
         * update user if it exists
         */
        if (userExistence)
            return (await this.updateUser(phone, {otp}));

        /**
         * create new user if user wasn't found,
         */
        return (await userModel.create({phone, otp}));
    }

    /**
     * change user existence by phone number
     * @param phone user phone number
     * @returns {Promise<boolean>}
     */
    async checkUserExistence(phone) {
        /** get user data from database */
        const getUser = await userModel.findOne({phone});

        /** return true if user was found and false if it wasn't */
        return !!getUser;
    }

    /**
     * update user data
     * @param phone user phone number
     * @param data data which you plan on update
     * @returns {Promise<boolean>}
     */
    async updateUser(phone, data = {}) {
        /** valida updatable data */
        Object.keys(data).forEach(key => {
            if (["", " ", 0, null, undefined, "0", NaN].includes(data[key])) delete data[key]
        });

        /** update user data */
        const updateResult = await userModel.updateOne({phone}, {$set: data});

        /** return true if update was successful and false if it wasn't */
        return !!updateResult.modifiedCount
    }
}

module.exports = {
    UserAuthController: new UserAuthController()
}