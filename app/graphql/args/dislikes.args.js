/** import graphql methods and types */
const {GraphQLString} = require("graphql");

/**
 * define products dislike args
 */
const ProductDislikeArgs = {
    productId: {type: GraphQLString},
}

/**
 * define blog dislike args
 */
const BlogDislikeArgs = {
    blogId: {type: GraphQLString},
}

/**
 * define course dislike args
 */
const CourseDislikeArgs = {
    courseId: {type: GraphQLString},
}

module.exports = {
    ProductDislikeArgs,
    BlogDislikeArgs,
    CourseDislikeArgs,
}