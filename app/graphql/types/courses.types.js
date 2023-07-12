/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require("graphql");
/** import graphql iso-date-type module */
const {GraphQLDateTime} = require("graphql-iso-date");
/** import public types */
const {UserType, PublicCategoryType} = require("./public.types");

/**
 * define episodes type
 */
const EpisodesType = new GraphQLObjectType({
    name: 'episodesType',
    fields:{
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        type: {type: GraphQLString},
        duration: {type: GraphQLString},

    }
})

/**
 * define chapter type
 */
const ChaptersType = new GraphQLObjectType({
    name: 'chaptersType',
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        episodes: {type: new GraphQLList(EpisodesType)},
        videoAddress : {type : GraphQLString},
    }
})

/**
 * define courses type
 */
const CourseType = new GraphQLObjectType({
    name: 'courseType',
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        summary: {type: GraphQLString},
        description: {type: GraphQLString},
        image: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        courseType: {type: GraphQLString},
        duration: {type: GraphQLString},
        status: {type: GraphQLString},
        mentor: {type: UserType},
        chapters: {type: new GraphQLList(ChaptersType)},
        createdAt: {type: GraphQLDateTime},
        updatedAt: {type: GraphQLDateTime},
    }
});

/**
 * define courses list type
 */
const CoursesListType = new GraphQLList(CourseType);


module.exports = {
    CourseType,
    CoursesListType
}