/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLScalarType, GraphQLInt, GraphQLBoolean} = require("graphql");
/** import graphql utils */
const {toObject, parseLiteral} = require("app/graphql/utils");

/**
 * define graphql scalar type
 * @type {GraphQLScalarType}
 */
const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral,
});

/**
 * define author type
 * @type {GraphQLObjectType<any, any>}
 */
const UserType = new GraphQLObjectType({
    name: 'userType',
    fields: {
        _id: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString}
    }
});

/**
 * define category type
 * @type {GraphQLObjectType<any, any>}
 */
const PublicCategoryType = new GraphQLObjectType({
    name: 'publicCategoryType',
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
    }
});

/**
 * define mutation response type
 * @type {GraphQLObjectType<any, any>}
 */
const ResponseType = new GraphQLObjectType({
    name: "responseType",
    fields: {
        status: {type: GraphQLInt},
        success: {type: GraphQLBoolean},
        message: {type: GraphQLString},
        data: {type: AnyType}
    }
})

module.exports = {
    UserType,
    PublicCategoryType,
    AnyType,
    ResponseType
}