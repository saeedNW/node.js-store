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
/** import dislikes mutation */
const {
    ProductDislikeMutation,
    CourseDislikeMutation,
    BlogDislikeMutation,
} = require("./dislike.mutation");
/** import dislikes mutation */
const {
    ProductBookmarkMutation,
    CourseBookmarkMutation,
    BlogBookmarkMutation,
} = require("./bookmark.mutation");

module.exports = {
    BlogCommentCreationMutation,
    CourseCommentCreationMutation,
    ProductCommentCreationMutation,
    ProductLikeMutation,
    BlogLikeMutation,
    CourseLikeMutation,
    ProductDislikeMutation,
    CourseDislikeMutation,
    BlogDislikeMutation,
    ProductBookmarkMutation,
    CourseBookmarkMutation,
    BlogBookmarkMutation,
}