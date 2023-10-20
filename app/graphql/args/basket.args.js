/** import graphql methods and types */
const {GraphQLString} = require("graphql");

/**
 * define basket's product args
 */
const BasketProductArgs = {
    productId: {type: GraphQLString},
}

module.exports = {
    BasketProductArgs,
}