/** import graphql */
const {GraphQLObjectType, GraphQLSchema} = require("graphql");
/** import queries */
const {
    BlogsListQuery, BlogQuery,
    ProductsListQuery, ProductQuery,
    CoursesListQuery, CourseQuery,
    CategoryQuery, CategoriesListQuery,
    ParentCategoriesList, ChildCategoriesList
} = require("./queries");

/**
 * define graphql root query
 * @type {GraphQLObjectType<any, any>}
 */
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blog: BlogQuery,
        blogs: BlogsListQuery,
        product: ProductQuery,
        products: ProductsListQuery,
        course: CourseQuery,
        courses: CoursesListQuery,
        category: CategoryQuery,
        categories: CategoriesListQuery,
        parentCategories: ParentCategoriesList,
        childCategories: ChildCategoriesList,
    }
});

/**
 * define graphql root mutations
 * @type {GraphQLObjectType<any, any>}
 */
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {}
});

/**
 * define graphql custom schema
 * @type {GraphQLSchema}
 */
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
});

module.exports = {
    graphQLSchema
}