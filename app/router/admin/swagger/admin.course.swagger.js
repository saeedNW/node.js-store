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
 */

/**
 * @swagger
 *  components:
 *      schemas:
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
 *  components:
 *      schemas:
 *      parameters:
 *          CourseID:
 *              name: courseId
 *              in: path
 *              type: string
 *              required: true
 *              schema:
 *                  type: string
 *              description: course ObjectId
 */

/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: course ObjectID
 *                      example: 640d6eb5f4f1b2f8a1a55dd1
 *                  title:
 *                      type: string
 *                      description: course title
 *                      example: "title of course"
 *                  summary:
 *                      type: string
 *                      description: course summary
 *                      example: "course summary"
 *                  description:
 *                      type: string
 *                      description: course description
 *                      example: "course long description"
 *                  status:
 *                      type: string
 *                      description: course publish status
 *                      example: "notStarted|completed|holding"
 *                  duration:
 *                      type: string
 *                      description: course duration time
 *                      example: "25:12:48"
 *                  price:
 *                      type: integer
 *                      description: course price
 *                      example: 256,000
 *                  discount:
 *                      type: integer
 *                      description: course discount percentage
 *                      example: 20
 *                  studentsCount:
 *                      type: integer
 *                      description: course students count
 *                      example: 2
 *                  mentor:
 *                      type: string
 *                      description: course mentor name
 *                      example: "saeed norouzi"
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /admin/courses/single/{courseId}:
 *  get:
 *      summary: get single course
 *      description: get single course by id
 *      tags: [AdminPanel(course)]
 *      parameters:
 *          -   $ref: '#/components/parameters/CourseID'
 *      responses:
 *          200:
 *              description: successful
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: forbidden
 *          422:
 *              description: validation error
 *          500:
 *              description: Internal server error
 */