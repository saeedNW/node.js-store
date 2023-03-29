/**
 * @swagger
 *  components:
 *      schemas:
 *          AddBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   summary
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: blog title
 *                  text:
 *                      type: text
 *                      description: blog content
 *                  summary:
 *                      type: text
 *                      description: blog summary text
 *                  tags:
 *                      type: string
 *                      description: blog tags, should be separated by hashtag
 *                      example: tag1#tag2#tag3
 *                  category:
 *                      type: string
 *                      description: _id of the category that blog, belongs to
 *                  image:
 *                      type: file
 *                      description: blog image
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateBlog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: blog title
 *                  text:
 *                      type: text
 *                      description: blog content
 *                  summary:
 *                      type: text
 *                      description: blog summary text
 *                  tags:
 *                      type: string
 *                      description: blog tags, should be separated by hashtag
 *                  category:
 *                      type: string
 *                      description: _id of the category that blog, belongs to
 *                  image:
 *                      type: file
 *                      description: blog image
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          BlogId:
 *              name: blogId
 *              in: path
 *              type: string
 *              required: true
 *              schema:
 *                  type: string
 *              description: blog ObjectId
 */

/**
 * @swagger
 *  definitions:
 *      ListOfBlogs:
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
 *                      blogs:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      description: course ObjectID
 *                                      example: 640d6eb5f4f1b2f8a1a55dd1
 *                                  author:
 *                                      type: object
 *                                      description: blog author data
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                              description: course ObjectID
 *                                              example: 640d6eb5f4f1b2f8a1a55dd1
 *                                          first_name:
 *                                              type: string
 *                                              description: author first name
 *                                              example: Saeed
 *                                          last_name:
 *                                              type: string
 *                                              description: author last name
 *                                              example: Norouzi
 *                                          username:
 *                                              type: string
 *                                              description: author username
 *                                              example: SNW13
 *                                  title:
 *                                      type: string
 *                                      description: blog title
 *                                      example: "title of blog"
 *                                  summary:
 *                                      type: string
 *                                      description: blog summary
 *                                      example: "blog short summary"
 *                                  text:
 *                                      type: string
 *                                      description: blog description
 *                                      example: "blog long description"
 *                                  image:
 *                                      type: string
 *                                      description: blog image
 *                                      example: "upload/2023/3/26/1679819392568.png"
 *                                  tags:
 *                                      type: array
 *                                      description: course tags
 *                                      items:
 *                                          type: string
 *                                          example: tag1
 *                                  category:
 *                                      type: object
 *                                      descriptions: blog category data
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                              description: category ObjectID
 *                                              example: 640d6eb5f4f1b2f8a1a55dd1
 *                                          title:
 *                                              type: string
 *                                              description: category title
 */

/**
 * @swagger
 *  definitions:
 *      NewBlog:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 201
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
 *                      blog:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: course ObjectID
 *                                  example: 640d6eb5f4f1b2f8a1a55dd1
 *                              author:
 *                                  type: object
 *                                  description: blog author data
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          description: course ObjectID
 *                                          example: 640d6eb5f4f1b2f8a1a55dd1
 *                                      first_name:
 *                                          type: string
 *                                          description: author first name
 *                                          example: Saeed
 *                                      last_name:
 *                                          type: string
 *                                          description: author last name
 *                                          example: Norouzi
 *                                      username:
 *                                          type: string
 *                                          description: author username
 *                                          example: SNW13
 *                              title:
 *                                  type: string
 *                                  description: blog title
 *                                  example: "title of blog"
 *                              summary:
 *                                  type: string
 *                                  description: blog summary
 *                                  example: "blog short summary"
 *                              text:
 *                                  type: string
 *                                  description: blog description
 *                                  example: "blog long description"
 *                              image:
 *                                  type: string
 *                                  description: blog image
 *                                  example: "upload/2023/3/26/1679819392568.png"
 *                              tags:
 *                                  type: array
 *                                  description: course tags
 *                                  items:
 *                                      type: string
 *                                      example: tag1
 *                              category:
 *                                  type: object
 *                                  descriptions: blog category data
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          description: category ObjectID
 *                                          example: 640d6eb5f4f1b2f8a1a55dd1
 *                                      title:
 *                                          type: string
 *                                          description: category title
 */

/**
 * @swagger
 *  definitions:
 *      SingleBlog:
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
 *                      blog:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: course ObjectID
 *                                  example: 640d6eb5f4f1b2f8a1a55dd1
 *                              author:
 *                                  type: object
 *                                  description: blog author data
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          description: course ObjectID
 *                                          example: 640d6eb5f4f1b2f8a1a55dd1
 *                                      first_name:
 *                                          type: string
 *                                          description: author first name
 *                                          example: Saeed
 *                                      last_name:
 *                                          type: string
 *                                          description: author last name
 *                                          example: Norouzi
 *                                      username:
 *                                          type: string
 *                                          description: author username
 *                                          example: SNW13
 *                              title:
 *                                  type: string
 *                                  description: blog title
 *                                  example: "title of blog"
 *                              summary:
 *                                  type: string
 *                                  description: blog summary
 *                                  example: "blog short summary"
 *                              text:
 *                                  type: string
 *                                  description: blog description
 *                                  example: "blog long description"
 *                              image:
 *                                  type: string
 *                                  description: blog image
 *                                  example: "upload/2023/3/26/1679819392568.png"
 *                              tags:
 *                                  type: array
 *                                  description: course tags
 *                                  items:
 *                                      type: string
 *                                      example: tag1
 *                              category:
 *                                  type: object
 *                                  descriptions: blog category data
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          description: category ObjectID
 *                                          example: 640d6eb5f4f1b2f8a1a55dd1
 *                                      title:
 *                                          type: string
 *                                          description: category title
 */

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          summary: get all blogs
 *          description: get all blog posts as list
 *          tags: [AdminPanel(Blog)]
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfBlogs'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          summary: add blog post
 *          description: create new post for blog
 *          tags: [AdminPanel(Blog)]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddBlog'
 *          responses:
 *              201:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NewBlog'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/blogs/single/{blogId}:
 *      get:
 *          summary: get single blog post
 *          description: get a single blog post by its id and populate it with category and author fields
 *          tags: [AdminPanel(Blog)]
 *          parameters:
 *              -   $ref: '#/components/parameters/BlogId'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/SingleBlog'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/blogs/remove/{blogId}:
 *      delete:
 *          summary: remove blog post
 *          description: remove single post using its _id
 *          tags: [AdminPanel(Blog)]
 *          parameters:
 *              -   $ref: '#/components/parameters/BlogId'
 *          responses:
 *              200:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /admin/blogs/update/{blogId}:
 *      patch:
 *          summary: update a blog
 *          description: update single blog data by its id
 *          tags: [AdminPanel(Blog)]
 *          parameters:
 *              -   $ref: '#/components/parameters/BlogId'
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateBlog'
 *          responses:
 *              200:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */