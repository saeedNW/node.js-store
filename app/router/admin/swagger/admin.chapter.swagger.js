/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   title
 *                  -   description
 *              properties:
 *                  courseId:
 *                      type: string
 *                      description: ObjectID of the course that chapter belongs to
 *                  title:
 *                      type: string
 *                      description: chapter title
 *                  description:
 *                      type: string
 *                      description: chapter full description
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateChapter:
 *                  type: object
 *                  required:
 *                      -   title
 *                      -   description
 *                  properties:
 *                      title:
 *                          type: string
 *                          description: chapter title
 *                      description:
 *                          type: string
 *                          description: chapter full description
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          CourseId:
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
 *  components:
 *      parameters:
 *          ChapterId:
 *              name: chapterId
 *              in: path
 *              type: string
 *              required: true
 *              schema:
 *                  type: string
 *              description: chapter ObjectId
 */

/**
 * @swagger
 *  definitions:
 *      ListOfChapters:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: true
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "your request ended successfully"
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: course ObjectID
 *                                  example: 640d6eb5f4f1b2f8a1a55dd1
 *                              title:
 *                                  type: string
 *                                  description: course title
 *                                  example: "title of course"
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                              description: chapter ObjectID
 *                                              example: 640d6eb5f4f1b2f8a1a55dd1
 *                                          title:
 *                                              type: string
 *                                              description: chapter title
 *                                              example: "title of chapter"
 *                                          description:
 *                                              type: string
 *                                              description: chapter description
 *                                              example: "chapter long description"
 *                                          episodes:
 *                                              type: array
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      _id:
 *                                                          type: string
 *                                                          description: episode ObjectID
 *                                                          example: 640d6eb5f4f1b2f8a1a55dd1
 *                                                      title:
 *                                                          type: string
 *                                                          description: episode title
 *                                                          example: "title of episode"
 *                                                      description:
 *                                                          type: string
 *                                                          description: episode description
 *                                                          example: "episode long description"
 *                                                      type:
 *                                                          type: string
 *                                                          description: episode type (lock, unlock)
 *                                                          example: lock
 *                                                      duration:
 *                                                          type: string
 *                                                          description: episode duration time
 *                                                          example: "25:12:48"
 */

/**
 * @swagger
 *  definitions:
 *      SingleChapter:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 200
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: true
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "your request ended successfully"
 *              data:
 *                  type: object
 *                  properties:
 *                      chapter:
 *                          type: object
 *                          properties:
 *                               _id:
 *                                   type: string
 *                                   description: chapter ObjectID
 *                                   example: 640d6eb5f4f1b2f8a1a55dd1
 *                               title:
 *                                   type: string
 *                                   description: chapter title
 *                                   example: "title of chapter"
 *                               description:
 *                                   type: string
 *                                   description: chapter description
 *                                   example: "chapter long description"
 *                               episodes:
 *                                   type: array
 *                                   items:
 *                                       type: object
 *                                       properties:
 *                                           _id:
 *                                               type: string
 *                                               description: episode ObjectID
 *                                               example: 640d6eb5f4f1b2f8a1a55dd1
 *                                           title:
 *                                               type: string
 *                                               description: episode title
 *                                               example: "title of episode"
 *                                           description:
 *                                               type: string
 *                                               description: episode description
 *                                               example: "episode long description"
 *                                           type:
 *                                               type: string
 *                                               description: episode type (lock, unlock)
 *                                               example: lock
 *                                           duration:
 *                                               type: string
 *                                               description: episode duration time
 *                                               example: "25:12:48"
 */

/**
 * @swagger
 *  /admin/chapters/new:
 *      put:
 *          summary: add new chapter
 *          tags: [AdminPanel(chapters)]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              201:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DefaultCreate'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Forbidden'
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/chapters/list/{courseId}:
 *      get:
 *          summary: get  single course chapters list
 *          tags: [AdminPanel(chapters)]
 *          parameters:
 *              -   $ref: '#/components/parameters/CourseId'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfChapters'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Forbidden'
 *              404:
 *                  description: data not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFound'
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/chapters/single/{chapterId}:
 *      get:
 *          summary: get single chapter by ObjectId
 *          tags: [AdminPanel(chapters)]
 *          parameters:
 *              -   $ref: '#/components/parameters/ChapterId'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/SingleChapter'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Forbidden'
 *              404:
 *                  description: data not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFound'
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/chapters/remove/{chapterId}:
 *      delete:
 *          summary: remove single chapter by ObjectId
 *          tags: [AdminPanel(chapters)]
 *          parameters:
 *              -   $ref: '#/components/parameters/ChapterId'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DefaultSuccess'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Forbidden'
 *              404:
 *                  description: data not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFound'
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/chapters/update/{chapterId}:
 *      patch:
 *          summary: update chapter by ObjectId
 *          tags: [AdminPanel(chapters)]
 *          parameters:
 *              -   $ref: '#/components/parameters/ChapterId'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateChapter'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DefaultSuccess'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Forbidden'
 *              404:
 *                  description: data not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFound'
 *              500:
 *                  description: Internal server error
 */