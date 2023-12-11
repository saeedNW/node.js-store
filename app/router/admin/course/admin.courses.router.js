/** define admin course router */
const adminCourseRouter = require("express").Router();
/** import admin course controller */
const {AdminCourseController} = require("app/http/controllers/admin/course/admin.course.controller");
/** import file uploader */
const {uploadFile} = require("app/utils/multer");
/** import string to array convertor */
const {stringToArray} = require("app/http/middlewares/string.to.array.middleware");

adminCourseRouter.post("/new", uploadFile.single("image"), stringToArray("tags", "body"), AdminCourseController.addCourse);

adminCourseRouter.patch("/edit/:courseId", AdminCourseController.updateCourse);

adminCourseRouter.delete("/remove/:courseId", AdminCourseController.removeCourse);

adminCourseRouter.get("/all", AdminCourseController.getAllCourses);

adminCourseRouter.get("/single/:courseId", AdminCourseController.getSingleCourse);

adminCourseRouter.put("/new/episode", AdminCourseController.newEpisode);

module.exports = {
    adminCourseRouter
}
