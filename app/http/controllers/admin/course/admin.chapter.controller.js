/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import models */
const {courseModel} = require("app/models");
/** import http status codes module */
const httpStatus = require("http-status-codes");
/** import http-error module */
const createError = require("http-errors");
/** import validators */
const {ObjectIdValidator} = require("app/http/validators/public/public.schema");

/**
 * @class AdminChapterController
 */
class AdminChapterController extends Controller {
    /**
     * add new chapter
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async newChapter(req, res, next) {
        try {
            /** get data request body */
            const {courseId, title, description} = req.body;

            /** check course existence */
            await this.findCourseById(courseId);

            /** update course chapter */
            const createdChapter = await courseModel.updateOne({_id: this.convertStringToMongoObjectId(courseId)}, {
                $push: {
                    chapters: {
                        title,
                        description
                    }
                }
            });

            /** throw error if update was unsuccessful */
            if (createdChapter.modifiedCount <= 0) throw createError.ServerInternalError("بروزرسانی با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

            this.sendSuccessResponse(req, res, httpStatus.CREATED, "بروزرسانی با موفقیت انجام شد");
        } catch (err) {
            next(err);
        }
    }

    /**
     * find course by id
     * @param courseId
     * @returns {Promise<*>}
     */
    async findCourseById(courseId) {
        /** MongoDB ObjectID validator */
        const {id} = await ObjectIdValidator.validateAsync({id: courseId});
        /** get course from database */
        const course = await courseModel.findById(this.convertStringToMongoObjectId(id));
        /** return error if course was not found */
        if (!course) throw createError.NotFound("محصولی یافت نشد");
        /** return course */
        return course;
    }
}

module.exports = {
    AdminChapterController: new AdminChapterController()
}