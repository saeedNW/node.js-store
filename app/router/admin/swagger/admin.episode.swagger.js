/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   chapterId
 *                  -   title
 *                  -   description
 *                  -   video
 *                  -   type
 *              properties:
 *                  courseId:
 *                      type: string
 *                      description: course ObjectId
 *                      example: 62822e4ff68cdded54aa928d
 *                  chapterId:
 *                      type: string
 *                      description: chapter ObjectId
 *                      example: 628dd482330688179ab88203
 *                  title:
 *                      type: string
 *                      description: episode title
 *                      example: "title of episode"
 *                  description:
 *                      type: string
 *                      description: episode description
 *                      example: "episode long description"
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          EditEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: episode title
 *                      example: "title of episode"
 *                  description:
 *                      type: string
 *                      description: episode description
 *                      example: "episode long description"
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          EpisodeId:
 *              name: episodeId
 *              in: path
 *              type: string
 *              required: true
 *              schema:
 *                  type: string
 *              description: episode ObjectId
 */

/**
 * @swagger
 *  /admin/episodes/new:
 *      post:
 *          summary: create new episode for chapter
 *          tags: [AdminPanel(episodes)]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
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
 *  /admin/episodes/update/{episodeID}:
 *      patch:
 *          summary: edit episode of chapter
 *          tags: [AdminPanel(episodes)]
 *          parameters:
 *              -   $ref: '#/components/parameters/EpisodeId'
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditEpisode'
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
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/episodes/remove/{episodeID}:
 *      delete:
 *          summary: remove episode of Chapter
 *          tags: [AdminPanel(episodes)]
 *          parameters:
 *              -   $ref: '#/components/parameters/EpisodeId'
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
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */