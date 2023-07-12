/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define answer schema
 */
const answerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    visibility: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    /** activate timestamp (createdAt/updatedAt) */
    timestamps: true,
    /** activate virtuals */
    toJSON: {virtuals: true},
    /** remove external id option */
    id: false,
    /** remove version key */
    versionKey: false
});

/**
 * define comments schema
 */
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    visibility: {
        type: Boolean,
        required: true,
        default: false
    },
    openToComment: {
        type: Boolean,
        default: true
    },
    answers: {
        type: [answerSchema],
        default: [],
    }
}, {
    /** activate timestamp (createdAt/updatedAt) */
    timestamps: true,
    /** activate virtuals */
    toJSON: {virtuals: true},
    /** remove external id option */
    id: false,
    /** remove version key */
    versionKey: false
});

module.exports = {
    commentSchema
}