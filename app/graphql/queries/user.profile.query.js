/** import blogs types */
const {BlogsListType} = require("app/graphql/types/blogs.types");
/** import courses types */
const {CoursesListType} = require("app/graphql/types/courses.types");
/** import products types */
const {ProductsListType} = require("app/graphql/types/products.types");
/** import user profile resolver */
const {
    UserBookmarkedBlogsResolver,
    UserBookmarkedCoursesResolver,
    UserBookmarkedProductsResolver,
    UserBasketResolver
} = require("app/graphql/resolvers/user.profile.resolver");



const {AnyType} = require("../types/public.types");

/**
 * define user bookmarked blogs query
 */
const UserBookmarkedBlogsQuery = {
    type: BlogsListType,
    resolve: UserBookmarkedBlogsResolver
}

/**
 * define user bookmarked courses query
 */
const UserBookmarkedCoursesQuery = {
    type: CoursesListType,
    resolve: UserBookmarkedCoursesResolver
}

/**
 * define user bookmarked products query
 */
const UserBookmarkedProductsQuery = {
    type: ProductsListType,
    resolve: UserBookmarkedProductsResolver
}

/**
 * define user basket query
 */
const UserBasketQuery = {
    type: AnyType,
    resolve: UserBasketResolver
}

module.exports = {
    UserBookmarkedBlogsQuery,
    UserBookmarkedCoursesQuery,
    UserBookmarkedProductsQuery,
    UserBasketQuery,
}