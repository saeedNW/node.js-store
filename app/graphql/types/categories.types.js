/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require("graphql");
/** import graphql iso-date-type module */
const {GraphQLDateTime} = require("graphql-iso-date");
/** import public types */
const {AnyType} = require("./public.types");

/**
 * define category type
 */
const CategoryType = new GraphQLObjectType({
    name: "categoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        createdAt: {type: GraphQLDateTime},
        updatedAt: {type: GraphQLDateTime},
        /**
         * By defining the Type of children as "AnyType",
         * we make it possible to returns parents categories as
         * the first option and then goes deep to their children
         */
        children: {type: new GraphQLList(AnyType)}
    }
})

/**
 * define categories list type
 */
const CategoriesListType = new GraphQLList(CategoryType);

module.exports = {
    CategoryType,
    CategoriesListType
}