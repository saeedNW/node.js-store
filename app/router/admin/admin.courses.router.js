/** define admin course router */
const adminCourseRouter = require("express").Router();
/** import admin product controller */
const {AdminCourseController} = require("app/http/controllers/admin/course/admin.course.controller");
/** import file uploader */
const {uploadFile} = require("app/utils/multer");
/** import string to array convertor */
const {stringToArray} = require("app/http/middlewares/string.to.array.middleware");

/**
 * @swagger
 *  components:
 *      schemas:
 *          CourseType:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   vpi
 *          AddCourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   summary
 *                  -   description
 *                  -   image
 *                  -   tags
 *                  -   category
 *                  -   courseType
 *              properties:
 *                  title:
 *                      type: string
 *                      description: course title
 *                  summary:
 *                      type: string
 *                      description: short summery about course
 *                  description:
 *                      type: string
 *                      description: course full description
 *                  tags:
 *                      type: array
 *                      description: course tags
 *                  category:
 *                      type: string
 *                      description: course category _id
 *                  image:
 *                      type: string
 *                      description: course image
 *                      format: binary
 *                  price:
 *                      type: number
 *                      description: course price, in case of free course just leaves it blank
 *                      default: 2412
 *                  discount:
 *                      type: number
 *                      description: course discounted price
 *                      default: 21
 *                  courseType:
 *                      $ref: '#/components/schemas/CourseType'
 */

/**
 * @swagger
 *  /admin/courses/new:
 *      post:
 *          summary: add new course
 *          description: creating new course
 *          tags: [AdminPanel(course)]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCourse'
 *          responses:
 *              201:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */
adminCourseRouter.post("/new", uploadFile.single("image"), stringToArray("tags"), AdminCourseController.addCourse);

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
