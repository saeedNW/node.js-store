/** import blogs types */
const {BlogsListType, BlogType} = require("app/graphql/types/blogs.types");
/** import blogs resolver */
const {BlogsListResolver, BlogResolver} = require("app/graphql/resolvers/blog.resolver");

/**
 * define blog query
 */
const BlogQuery = {
    type: BlogType,
    resolve: BlogResolver
}

/**
 * define blogs list query
 */
const BlogsListQuery = {
    type: BlogsListType,
    resolve: BlogsListResolver
}

module.exports = {
    BlogQuery,
    BlogsListQuery
}