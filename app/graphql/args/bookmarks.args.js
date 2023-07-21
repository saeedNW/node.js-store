/** import graphql methods and types */
const {GraphQLString} = require("graphql");

/**
 * define products bookmark args
 */
const ProductBookmarkArgs = {
    productId: {type: GraphQLString},
}

/**
 * define blog bookmark args
 */
const BlogBookmarkArgs = {
    blogId: {type: GraphQLString},
}

/**
 * define course bookmark args
 */
const CourseBookmarkArgs = {
    courseId: {type: GraphQLString},
}

module.exports = {
    ProductBookmarkArgs,
    BlogBookmarkArgs,
    CourseBookmarkArgs,
}