/** import blog query */
const {BlogsListQuery, BlogQuery} = require("./blogs.query");
/** import products queries */
const {ProductsListQuery, ProductQuery} = require("./products.query");
/** import products queries */
const {CoursesListQuery, CourseQuery} = require("./courses.query");
/** import categories queries */
const {
    CategoryQuery, CategoriesListQuery,
    ParentCategoriesList, ChildCategoriesList
} = require("./categories.query");
/** import user profile queries */
const {
    UserBookmarkedBlogsQuery, UserBookmarkedCoursesQuery,
    UserBookmarkedProductsQuery, UserBasketQuery,
} = require("./user.profile.query");

module.exports = {
    BlogsListQuery, BlogQuery,
    ProductsListQuery, ProductQuery,
    CoursesListQuery, CourseQuery,
    CategoryQuery, CategoriesListQuery,
    ParentCategoriesList, ChildCategoriesList,
    UserBookmarkedBlogsQuery,
    UserBookmarkedCoursesQuery,
    UserBookmarkedProductsQuery,
    UserBasketQuery,
}