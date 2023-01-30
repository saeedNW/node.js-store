/** import joi module */
const Joi = require("@hapi/joi");
/** import http-error module */
const createError = require("http-errors");
/**
 * define valid phone regex
 * @type {RegExp}
 */
const PhoneRegEx = new RegExp("^(?:(٠٩[٠-٩][٠-٩]{8})|(۰۹[۰-۹][۰-۹]{8})|(09[0-9][0-9]{8}))$")


/** define user auth get opt validator schema */
const getOtpSchema = Joi.object({
    /** phone validator */
    phone: Joi
        /** it should be string */
        .string()
        /** make it required */
        .required()
        /** it should be 11 character long */
        .length(11)
        /** it should be a valid phone number */
        .pattern(PhoneRegEx)
        /** set validation error */
        .error(createError.UnprocessableEntity("شماره موبایل وارد شده صحیح نمیباشد"))
});

/** define user auth check opt validator schema */
const checkOtpSchema = Joi.object({
    /** phone validator */
    phone: Joi.string().required().length(11).pattern(PhoneRegEx).error(createError.UnprocessableEntity("شماره موبایل وارد شده صحیح نمیباشد")),
    /** code validator */
    code: Joi.string().min(4).max(6).error(createError.UnprocessableEntity("کد ارسال شده صحیح نمیباشد"))
});

module.exports = {
    getOtpSchema,
    checkOtpSchema
}