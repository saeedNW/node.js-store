/** import public types */
const {ResponseType} = require("app/graphql/types/public.types");
/** import dislikes args */
const {
    ProductDislikeArgs,
    CourseDislikeArgs,
    BlogDislikeArgs,
} = require("app/graphql/args/dislikes.args");
/** import dislikes resolvers */
const {
    ProductDislikeResolver,
    CourseDislikeResolver,
    BlogDislikeResolver,
} = require("app/graphql/resolvers/dislikes.resolver");

/**
 * define product dislike mutation
 */
const ProductDislikeMutation = {
    type: ResponseType,
    args: {...ProductDislikeArgs},
    resolve: ProductDislikeResolver
}

/**
 * define course dislike mutation
 */
const CourseDislikeMutation = {
    type: ResponseType,
    args: {...CourseDislikeArgs},
    resolve: CourseDislikeResolver
}

/**
 * define blog dislike mutation
 */
const BlogDislikeMutation = {
    type: ResponseType,
    args: {...BlogDislikeArgs},
    resolve: BlogDislikeResolver
}

module.exports = {
    ProductDislikeMutation,
    CourseDislikeMutation,
    BlogDislikeMutation,
}