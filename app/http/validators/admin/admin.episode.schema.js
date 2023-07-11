/** import joi module */
const Joi = require("@hapi/joi");
/** import http-error module */
const createHttpError = require("http-errors");
/** import constants */
const {mongodbConstants} = require("app/utils/constans");

const createEpisodeSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new createHttpError.BadRequest("عنوان دوره صحیح نمیباشد")),
    description: Joi.string().error(new createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    type: Joi.string().regex(/(lock|unlock)/i),
    chapterId: Joi.string().regex(mongodbConstants.MongoIdPattern).error(new createHttpError.BadRequest("شناسه ی فصل صحیح نمیباشد")),
    courseId: Joi.string().regex(mongodbConstants.MongoIdPattern).error(new createHttpError.BadRequest("شناسه ی دوره صحیح نمیباشد")),
    fileName: Joi.string().regex(/(\.mp4|\.mov|\.mkv|\.mpg)$/).error(new createHttpError.BadRequest("ویدیو ارسال شده صحیح نمیباشد")),
    fileUploadPath : Joi.allow()
});

module.exports = {
    createEpisodeSchema
}