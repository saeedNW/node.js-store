/** import comments resolvers */
const {
    BlogCommentCreationResolver,
    ProductCommentCreationResolver,
    CourseCommentCreationResolver
} = require("app/graphql/resolvers/comments.resolver");
/** import comments args */
const {
    BlogCommentCreationArgs,
    CourseCommentCreationArgs,
    ProductCommentCreationArgs
} = require("app/graphql/args/comments.args");
/** import public types */
const {ResponseType} = require("app/graphql/types/public.types");

/**
 * define blog comment creation mutation
 */
const BlogCommentCreationMutation = {
    type: ResponseType,
    args: {...BlogCommentCreationArgs},
    resolve: BlogCommentCreationResolver
}

/**
 * define product comment creation mutation
 */
const ProductCommentCreationMutation = {
    type: ResponseType,
    args: {...ProductCommentCreationArgs},
    resolve: ProductCommentCreationResolver
}

/**
 * define course comment creation mutation
 */
const CourseCommentCreationMutation = {
    type: ResponseType,
    args: {...CourseCommentCreationArgs},
    resolve: CourseCommentCreationResolver
}

module.exports = {
    BlogCommentCreationMutation,
    ProductCommentCreationMutation,
    CourseCommentCreationMutation,
}