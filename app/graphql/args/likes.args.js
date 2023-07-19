/** import graphql methods and types */
const {GraphQLString} = require("graphql");

/**
 * define products like args
 */
const ProductLikeArgs = {
    productId: {type: GraphQLString},
}

/**
 * define blog like args
 */
const BlogLikeArgs = {
    blogId: {type: GraphQLString},
}

/**
 * define course like args
 */
const CourseLikeArgs = {
    courseId: {type: GraphQLString},
}

module.exports = {
    ProductLikeArgs,
    BlogLikeArgs,
    CourseLikeArgs,
}