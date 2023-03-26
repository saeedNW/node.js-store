/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import models */
const {courseModel} = require("app/models");
/** import http status codes module */
const httpStatus = require("http-status-codes");
/** import path module */
const path = require("path");
/** import course validator */
const {createCourseSchema} = require("app/http/validators/admin/admin.course.schema");
/** import http-error module */
const createError = require("http-errors");
/** import validators */
const {ObjectIdValidator} = require("app/http/validators/public/public.schema");

/**
 * @class AdminCourseController
 */
class AdminCourseController extends Controller {
    /**
     * add new course
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async addCourse(req, res, next) {
        try {
            /** get user id from request */
            const userId = req?.user?._id;

            /** user input validation */
            const courseData = await createCourseSchema.validateAsync(req.body);

            /** add file data to request body image */
            courseData.image = path.join(courseData.fileUploadPath, courseData.fileName);

            if (courseData.price > 0 && courseData.courseType === "free")
                throw createError.BadRequest("برای دوره رایگان نمیتوان قیمت ثبت کرد");

            /** create new course */
            const createdCourse = await courseModel.create({...courseData, mentor: userId});

            /** return error if course was not created */
            if (!createdCourse?._id) throw createError.InternalServerError("ایجاد دوره با مشکل مواجه شد لطفا مجددا تلاش نمایید");

            /** send success message */
            return this.sendSuccessResponse(req, res, httpStatus.CREATED, "دوره با موفقیت ایجاد شد", {createdCourse});
        } catch (err) {
            next(err);
        }
    }

    /**
     * update course
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async updateCourse(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * remove course
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async removeCourse(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * get all courses
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async getAllCourses(req, res, next) {
        try {
            /** get all courses from database */
            const courses = await courseModel.find({});
            /** send success response */
            this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {courses});
        } catch (err) {
            next(err);
        }
    }

    /**
     * get single course
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async getSingleCourse(req, res, next) {
        try {
            /** get course id from request params */
            const {courseId} = req.params;
            /** get course data from database based on course ObjectID */
            const course = await this.findCourseById(courseId);
            /** send success response */
            this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {course});
        } catch (err) {
            next(err);
        }
    }

    /**
     * add new chapter
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async newChapter(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * add new episode
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async newEpisode(req, res, next) {
        try {

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
        const course = await courseModel.findById(id);
        /** return error if course was not found */
        if (!course) throw createError.NotFound("محصولی یافت نشد");
        /** return course */
        return course;
    }
}

module.exports = {
    AdminCourseController: new AdminCourseController()
}