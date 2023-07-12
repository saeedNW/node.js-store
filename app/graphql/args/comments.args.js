/** import graphql methods and types */
const {GraphQLString} = require("graphql");

/**
 * define blog comment creation args
 */
const BlogCommentCreationArgs = {
    comment: {type: GraphQLString},
    blogId: {type: GraphQLString},
    parent: {type: GraphQLString},
}

/**
 * define product comment creation args
 */
const ProductCommentCreationArgs = {
    comment: {type: GraphQLString},
    productId: {type: GraphQLString},
    parent: {type: GraphQLString},
}

/**
 * define course comment creation args
 */
const CourseCommentCreationArgs = {
    comment: {type: GraphQLString},
    courseId: {type: GraphQLString},
    parent: {type: GraphQLString},
}

module.exports = {
    BlogCommentCreationArgs,
    ProductCommentCreationArgs,
    CourseCommentCreationArgs,
}