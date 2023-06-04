/** import graphql */
const {GraphQLObjectType, GraphQLString} = require("graphql");

/**
 * define author type
 */
const AuthorType = new GraphQLObjectType({
    name: 'authorType',
    fields: {
        _id: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString}
    }
});

/**
 * define category type
 */
const PublicCategoryType = new GraphQLObjectType({
    name: 'publicCategoryType',
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
    }
});

module.exports = {
    AuthorType,
    PublicCategoryType
}