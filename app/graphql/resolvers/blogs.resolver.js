/** import models */
const {blogModel} = require("app/models");

/**
 * define blog resolver
 */
const BlogResolver = async (_, args) => {
    const {blogId} = args;
    return blogModel.findOne({_id: blogId}).populate([{path: 'author'}, {path: 'category'}]);
}

/**
 * define blogs list resolver
 */
const BlogsListResolver = async () => {
    return blogModel.find({}).populate([{path: 'author'}, {path: 'category'}]);
}

module.exports = {
    BlogResolver,
    BlogsListResolver
}