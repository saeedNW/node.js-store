/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define blogs schema
 */
const Schema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    categories: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    comments: {
        type: [],
        default: []
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    dislike: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    bookmark: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
}, {
    timestamps: true
});

/**
 * create mongoose model from the schema
 */
const blogModel = mongoose.model("blog", Schema);

/** export schema */
module.exports = {
    blogModel
}