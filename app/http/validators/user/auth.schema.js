/** import joi module */
const Joi = require("@hapi/joi");
/** import http-error module */
const createError = require("http-errors");
/**
 * define valid phone regex
 * @type {RegExp}
 */
const PhoneRegEx= new RegExp("^(?:(٠٩[٠-٩][٠-٩]{8})|(۰۹[۰-۹][۰-۹]{8})|(09[0-9][0-9]{8}))$")


/** define auth get opt validator schema */
const getOtpSchema = Joi.object({
    phone : Joi.string().required().length(11).pattern(PhoneRegEx).error(createError.BadRequest("شماره موبایل وارد شده صحیح نمیباشد"))
});

const checkOtpSchema = Joi.object({
    phone : Joi.string().required().length(11).pattern(PhoneRegEx).error(createError.BadRequest("شماره موبایل وارد شده صحیح نمیباشد")),
    code : Joi.string().min(4).max(6).error(createError.BadRequest("کد ارسال شده صحیح نمیباشد"))
})

module.exports = {
    getOtpSchema,
    checkOtpSchema
}