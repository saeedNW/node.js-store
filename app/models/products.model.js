/** import mongoose module */
const {default: mongoose} = require("mongoose");

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
        type: String,
        required: true
    },
    duration: {
        type: String,
    },
    format: {
        type: String,
    },
    mentor: {
        type: mongoose.Types.ObjectId,
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