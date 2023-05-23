/** import graphql */
const {GraphQLObjectType, GraphQLSchema} = require("graphql");
/** import blog query */
const {BlogsListQuery} = require("./queries/blog.query");

/**
 * define graphql root query
 * @type {GraphQLObjectType<any, any>}
 */
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogsListQuery
    }
});

/**
 * define graphql root mutations
 * @type {GraphQLObjectType<any, any>}
 */
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {}
});

/**
 * define graphql custom schema
 * @type {GraphQLSchema}
 */
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
});

module.exports = {
    graphQLSchema
}