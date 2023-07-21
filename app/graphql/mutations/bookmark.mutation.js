/** import public types */
const {ResponseType} = require("app/graphql/types/public.types");
/** import bookmarks args */
const {
    ProductBookmarkArgs,
    BlogBookmarkArgs,
    CourseBookmarkArgs,
} = require("app/graphql/args/bookmarks.args");
/** import bookmarks resolvers */
const {
    ProductBookmarkResolver,
    CourseBookmarkResolver,
    BlogBookmarkResolver,
} = require("app/graphql/resolvers/bookmarks.resolver");

/**
 * define product bookmark mutation
 */
const ProductBookmarkMutation = {
    type: ResponseType,
    args: {...ProductBookmarkArgs},
    resolve: ProductBookmarkResolver
}

/**
 * define course bookmark mutation
 */
const CourseBookmarkMutation = {
    type: ResponseType,
    args: {...CourseBookmarkArgs},
    resolve: CourseBookmarkResolver
}

/**
 * define blog bookmark mutation
 */
const BlogBookmarkMutation = {
    type: ResponseType,
    args: {...BlogBookmarkArgs},
    resolve: BlogBookmarkResolver
}

module.exports = {
    ProductBookmarkMutation,
    CourseBookmarkMutation,
    BlogBookmarkMutation,
}