/** import mongoose module */
const {default: mongoose} = require("mongoose");
/** import comment schema */
const {commentSchema} = require("./schemas/comments.schema");

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
    images: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
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
    count: {
        type: Number,
    },
    type: {
        /** virtual or physical */
        type: String,
        required: true
    },
    format: {
        type: String,
    },
    supplier: {
        type: mongoose.Types.ObjectId,
        res: "user",
        required: true
    },
    features: {
        type: {
            length: {
                type: Number
            },
            height: {
                type: Number
            },
            width: {
                type: Number
            },
            weight: {
                type: Number
            },
            color: {
                type: [String]
            },
            model: {
                type: [String]
            },
            made_in: {
                type: String
            }
        },
        default: {
            length: "",
            height: "",
            width: "",
            weight: "",
            color: [""],
            model: [""],
            made_in: "",
        }
    },
}, {
    timestamps: true
});

/**
 * create mongoose model from the schema
 */
const productModel = mongoose.model("product", Schema);

/** export schema */
module.exports = {
    productModel
}