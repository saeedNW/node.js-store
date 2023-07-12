/** import comments resolvers */
const {BlogCommentCreationResolver} = require("app/graphql/resolvers/comments.resolver");
/** import comments args */
const {BlogCommentCreationArgs} = require("app/graphql/args/comments.args");
/** import public types */
const {ResponseType} = require("app/graphql/types/public.types");

/**
 * define comment creation mutation
 */
const BlogCommentCreationMutation = {
    type: ResponseType,
    args: {...BlogCommentCreationArgs},
    resolve: BlogCommentCreationResolver
}

module.exports = {
    BlogCommentCreationMutation
}