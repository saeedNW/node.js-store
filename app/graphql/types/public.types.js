/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLScalarType, GraphQLList} = require("graphql");
/** import graphql utils */
const {toObject, parseLiteral} = require("app/graphql/utils");

/**
 * define graphql scalar type
 */
const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral,
});

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
    PublicCategoryType,
    AnyType
}