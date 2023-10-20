/** import public types */
const {ResponseType} = require("app/graphql/types/public.types");
/** import basket resolvers */
const {
    AddProductToBasketResolver,
    AddCourseToBasketResolver,
} = require("app/graphql/resolvers/basket.resolver");
/** import basket args */
const {
    BasketProductArgs,
    BasketCourseArgs,
} = require("app/graphql/args/basket.args");

/**
 * define add product to basket mutation
 */
const AddProductToBasketMutation = {
    type: ResponseType,
    args: {...BasketProductArgs},
    resolve: AddProductToBasketResolver
}

/**
 * define add course to basket mutation
 */
const AddCourseToBasketMutation = {
    type: ResponseType,
    args: {...BasketCourseArgs},
    resolve: AddCourseToBasketResolver
}

module.exports = {
    AddProductToBasketMutation,
    AddCourseToBasketMutation,
}