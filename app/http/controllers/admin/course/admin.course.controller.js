/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import models */
const {courseModel} = require("app/models");
/** import http status codes module */
const httpStatus = require("http-status-codes");

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
}

module.exports = {
    AdminCourseController: new AdminCourseController()
}