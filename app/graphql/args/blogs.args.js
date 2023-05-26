/** import graphql */
const {GraphQLString} = require("graphql");

/**
 * define blog objectId argument
 */
const BlogId = {
    blogId: {type: GraphQLString},
}

module.exports = {
    BlogId
}