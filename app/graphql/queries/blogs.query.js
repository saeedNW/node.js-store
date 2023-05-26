/** import blogs types */
const {BlogsListType, BlogType} = require("app/graphql/types/blogs.types");
/** import blogs resolver */
const {BlogsListResolver, BlogResolver} = require("app/graphql/resolvers/blogs.resolver");
/** import categories args */
const {BlogId} = require("app/graphql/args/blogs.args");

/**
 * define blog query
 */
const BlogQuery = {
    type: BlogType,
    args: {...BlogId},
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