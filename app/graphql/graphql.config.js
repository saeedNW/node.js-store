/** import graphql custom schema */
const {graphQLSchema} = require("./index.graphql");

/**
 * define GraphQLHTTP config
 * @param req express request
 * @param res express response
 * @returns {{schema: GraphQLSchema, graphiql: boolean, context: {res, req}}}
 */
function graphqlConfig(req, res) {
    return {
        schema: graphQLSchema,
        graphiql: true,
        context: {req, res}
    }
}

module.exports = {
    graphqlConfig
}