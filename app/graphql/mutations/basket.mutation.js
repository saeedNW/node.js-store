/** import public types */
const {ResponseType} = require("app/graphql/types/public.types");
/** import basket resolvers */
const {
    AddProductToBasketResolver,
} = require("app/graphql/resolvers/basket.resolver");
/** import basket args */
const {
    BasketProductArgs,
} = require("app/graphql/args/basket.args");

/**
 * define add product to basket mutation
 */
const AddProductToBasketMutation = {
    type: ResponseType,
    args: {...BasketProductArgs},
    resolve: AddProductToBasketResolver
}

module.exports = {
    AddProductToBasketMutation,
}