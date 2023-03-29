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
 *  /admin/courses/new/chapter:
 *      put:
 *          summary: add new chapter
 *          description: creating new chapter for course
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