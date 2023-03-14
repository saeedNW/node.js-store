/** import mongoose module */
const {default: mongoose} = require("mongoose");
/** import comment schema */
const {commentSchema} = require("./schemas/comments.schema");

/**
 * define episodes schema
 */
const episodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        /** free, cash, vpi */
        type: String,
        default: "free"
    },
    duration: {
        type: String,
        required: true
    },
});

/**
 * define chapters schema
 */
const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    episodes: {
        type: [episodeSchema],
        default: []
    },
});

/**
 * define blogs schema
 */
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
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
        ref: "category",
        required: true
    },
    comments: {
        type: [commentSchema],
        default: []
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    dislikes: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    bookmarks: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    courseType: {
        /** free, cash, vpi */
        type: String,
        default: "free"
    },
    duration: {
        type: String,
        default: "00:00:00"
    },
    mentor: {
        type: mongoose.Types.ObjectId,
        res: "user",
        required: true
    },
    chapter: {
        type: [chapterSchema],
        default: []
    },
    students: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: "user"
    }
}, {
    /** activate timestamp (createdAt/updatedAt) */
    timestamps: true,
    /** remove external id option */
    id: false,
    /** remove version key */
    versionKey: false
});

/**
 * create mongoose model from the schema
 */
const courseModel = mongoose.model("course", Schema);

/** export schema */
module.exports = {
    courseModel
}