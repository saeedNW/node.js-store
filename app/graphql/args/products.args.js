/** import graphql */
const {GraphQLString} = require("graphql");

/**
 * define products objectId argument
 */
const ProductId = {
    productId: {type: GraphQLString},
}

module.exports = {
    ProductId
}