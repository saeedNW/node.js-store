/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require("graphql");
/** import public types */
const {UserType, PublicCategoryType} = require("./public.types");

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
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
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