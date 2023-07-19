/** import comment mutation */
const {
    BlogCommentCreationMutation,
    CourseCommentCreationMutation,
    ProductCommentCreationMutation
} = require("./comment.mutation");
/** import likes mutation */
const {
    ProductLikeMutation,
    BlogLikeMutation,
    CourseLikeMutation
} = require("./like.mutation");

module.exports = {
    BlogCommentCreationMutation,
    CourseCommentCreationMutation,
    ProductCommentCreationMutation,
    ProductLikeMutation,
    BlogLikeMutation,
    CourseLikeMutation,
}