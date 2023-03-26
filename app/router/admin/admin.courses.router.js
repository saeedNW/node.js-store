/** define admin course router */
const adminCourseRouter = require("express").Router();
/** import admin product controller */
const {AdminCourseController} = require("app/http/controllers/admin/course/admin.course.controller");

adminCourseRouter.post("/new", AdminCourseController.addCourse);

adminCourseRouter.patch("/edit/:courseId", AdminCourseController.updateCourse);

adminCourseRouter.delete("/remove/:courseId", AdminCourseController.removeCourse);

/**
 * @swagger
 *  /admin/courses/all:
 *      get:
 *          summary: get all courses
 *          description: get all courses
 *          tags: [AdminPanel(course)]
 *          responses:
 *              200:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
 *              500:
 *                  description: Internal server error
 */
adminCourseRouter.get("/all", AdminCourseController.getAllCourses);

adminCourseRouter.get("/single/:courseId", AdminCourseController.getSingleCourse);

adminCourseRouter.put("/new/chapter", AdminCourseController.newChapter);

adminCourseRouter.put("/new/episode", AdminCourseController.newEpisode);

module.exports = {
    adminCourseRouter
}
