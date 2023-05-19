/** import joi module */
const Joi = require("@hapi/joi");
/** import http-error module */
const createError = require("http-errors");
/** import constants */
const {mongodbConstants} = require("app/utils/constans");

const ObjectIdValidator = Joi.object({
    id: Joi.string().regex(mongodbConstants.MongoIdPattern).error(new createError.UnprocessableEntity("شناسه وارد شده صحیح نمیباشد")),
});

module.exports = {
    ObjectIdValidator
}