/** import graphql methods and types */
const {GraphQLString} = require("graphql");

/**
 * define blog comment creation args
 */
const BlogCommentCreationArgs = {
    comment: {type: GraphQLString},
    blogId: {type: GraphQLString},
    parent: {type: GraphQLString},
}

module.exports = {
    BlogCommentCreationArgs
}