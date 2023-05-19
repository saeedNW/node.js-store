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
            if (createdChapter.modifiedCount <= 0) throw new createError.ServerInternalError("بروزرسانی با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

            this.sendSuccessResponse(req, res, httpStatus.CREATED, "فصل با موفقیت افزوده شد");
        } catch (err) {
            next(err);
        }
    }

    /**
     * get chapters list of a single course
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async chapterOfCourse(req, res, next) {
        try {
            /** extract course id from request params */
            const {courseId} = req.params;

            /** read course data from database */
            const course = await this.getCourseChapters(courseId);

            /** send success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {course});
        } catch (err) {
            next(err);
        }
    }

    /**
     * get single chapter
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async singleChapter(req, res, next) {
        try {
            /** extract chapter id from request params */
            const {chapterId} = req.params;

            /** read chapter data from database */
            const chapter = await this.getChapterById(chapterId);

            /** send success response */
            this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {chapter});
        } catch (err) {
            next(err);
        }
    }

    /**
     * remove a chapter
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async removeChapterById(req, res, next) {
        try {
            /** extract chapter id from request params */
            const {chapterId} = req.params;

            /** read chapter data from database */
            await this.getChapterById(chapterId);

            /** remove chapter from course */
            const removedChapter = await courseModel.updateOne({'chapters._id': chapterId}, {
                '$pull': {
                    'chapters': {
                        '_id': chapterId
                    }
                }
            });

            /** throw error if update was unsuccessful */
            if (removedChapter.modifiedCount <= 0) throw new createError.ServerInternalError("بروزرسانی با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

            /** return success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK, 'فصل با موفقیت حذف گردید');
        } catch (err) {
            next(err);
        }
    }

    /**
     * update single chapter by object id
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async updateChapterById(req, res, next) {
        try {
            /** extract chapter id from request params */
            const {chapterId} = req.params;

            /** read chapter data from database */
            await this.getChapterById(chapterId);

            /**
             * extract data from request body.
             * todo@ add validation for user entries
             */
            const {title, description} = req.body;

            /** update chapter */
            const updatedChapter = await courseModel.updateOne({'chapters._id': chapterId}, {
                $set: {
                    'chapters.$': {
                        title,
                        description
                    }
                }
            });

            /** throw error if update was unsuccessful */
            if (updatedChapter.modifiedCount <= 0) throw new createError.ServerInternalError("بروزرسانی با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

            /** send success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK);
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
        if (!course) throw new createError.NotFound("محصولی یافت نشد");
        /** return course */
        return course;
    }

    /**
     * read amd return single course chapters
     * @param courseId courseId
     * @returns {Promise<*>}
     */
    async getCourseChapters(courseId) {
        /** MongoDB ObjectID validator */
        const {id} = await ObjectIdValidator.validateAsync({id: courseId});
        /** get course chapters */
        const course = await courseModel.findOne({_id: id}, {chapters: 1, title: 1});
        /** return error if chapter was not found */
        if (!course) throw new createError.NotFound("دوره انتخابی یافت نشد");
        /** return chapters */
        return course;
    }

    /**
     * read and return single chapter with ObjectId
     * @param chapterId
     * @returns {Promise<*>}
     */
    async getChapterById(chapterId) {
        /** MongoDB ObjectID validator */
        const {id} = await ObjectIdValidator.validateAsync({id: chapterId});
        /** get chapter data */
        const chapter = await courseModel.findOne({'chapters._id': id}, {'chapters.$': 1});
        /** return error if chapter was not found */
        if (!chapter) throw new createError.NotFound('فصل انتخابی یافت نشد');
        /** return chapter */
        return chapter['chapters'][0];
    }
}

module.exports = {
    AdminChapterController: new AdminChapterController()
}