/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLList} = require("graphql");
/** import public types */
const {AuthorType, CategoryType} = require("./public.types");

/**
 * define blog type
 */
const BlogType = new GraphQLObjectType({
    name: 'blogType',
    fields: {
        _id: {type: GraphQLString},
        author: {type: AuthorType},
        title: {type: GraphQLString},
        summary: {type: GraphQLString},
        text: {type: GraphQLString},
        image: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: CategoryType},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
    }
});

/**
 * define blogs list type
 */
const BlogsListType = new GraphQLList(BlogType);

module.exports = {
    BlogType,
    BlogsListType
}