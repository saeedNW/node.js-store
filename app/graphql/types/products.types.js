/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require("graphql");
/** import graphql iso-date-type module */
const {GraphQLDateTime} = require("graphql-iso-date");
/** import public types */
const {UserType, PublicCategoryType} = require("./public.types");
/** import comments type */
const {CommentsListType} = require("./comments.type");

/**
 * define product features type
 */
const FeaturesType = new GraphQLObjectType({
    name: 'featuresType',
    fields: {
        length: {type: GraphQLInt},
        height: {type: GraphQLInt},
        width: {type: GraphQLInt},
        weight: {type: GraphQLInt},
        colors: {type: new GraphQLList(GraphQLString)},
        model: {type: GraphQLString},
        made_in: {type: GraphQLString},
    }
});

/**
 * define product type
 */
const ProductType = new GraphQLObjectType({
    name: 'productType',
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        summary: {type: GraphQLString},
        description: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        count: {type: GraphQLInt},
        productType: {type: GraphQLString},
        format: {type: GraphQLString},
        supplier: {type: UserType},
        features: {type: FeaturesType},
        comments: {type: CommentsListType},
        likes: {type: new GraphQLList(UserType)},
        dislikes: {type: new GraphQLList(UserType)},
        createdAt: {type: GraphQLDateTime},
        updatedAt: {type: GraphQLDateTime},
    }
});

/**
 * define products list type
 */
const ProductsListType = new GraphQLList(ProductType);

module.exports = {
    ProductType,
    ProductsListType
}