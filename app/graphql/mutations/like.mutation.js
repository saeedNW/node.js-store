/** import public types */
const {ResponseType} = require("app/graphql/types/public.types");
/** import likes args */
const {
    ProductLikeArgs,
    BlogLikeArgs,
    CourseLikeArgs,
} = require("app/graphql/args/likes.args");
/** import likes resolvers */
const {
    ProductLikeResolver,
    CourseLikeResolver,
    BlogLikeResolver
} = require("app/graphql/resolvers/likes.resolver");

/**
 * define product like mutation
 */
const ProductLikeMutation = {
    type: ResponseType,
    args: {...ProductLikeArgs},
    resolve: ProductLikeResolver
}

/**
 * define course like mutation
 */
const CourseLikeMutation = {
    type: ResponseType,
    args: {...CourseLikeArgs},
    resolve: CourseLikeResolver
}

/**
 * define blog like mutation
 */
const BlogLikeMutation = {
    type: ResponseType,
    args: {...BlogLikeArgs},
    resolve: BlogLikeResolver
}

module.exports = {
    ProductLikeMutation,
    CourseLikeMutation,
    BlogLikeMutation,
}