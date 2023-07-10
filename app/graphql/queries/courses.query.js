/** import courses types */
const {CourseType, CoursesListType} = require("app/graphql/types/courses.types");
/** import courses resolvers */
const {CourseResolver, CoursesListResolver} = require("app/graphql/resolvers/courses.resolver");
/** import categories args */
const {CategoryId, CourseId} = require("app/graphql/args/courses.args");

/**
 * define course query
 */
const CourseQuery = {
    type: CourseType,
    args: {...CourseId},
    resolve: CourseResolver
}

/**
 * define courses list query
 */
const CoursesListQuery = {
    type: CoursesListType,
    resolve: CoursesListResolver
}

module.exports = {
    CourseQuery,
    CoursesListQuery
}