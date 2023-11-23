/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define product schema for basket
 */
const productSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "product"
    },
    count: {
        type: Number,
        default: 1
    }
});

/**
 * define course schema for basket
 */
const courseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "course"
    },
    count: {
        type: Number,
        default: 1
    }
});

/**
 * define basket schema
 */
const basketSchema = new mongoose.Schema({
    products: {
        type: [productSchema],
        default: []
    },
    courses: {
        type: [courseSchema],
        default: []
    },
});

/**
 * define user schema
 */
const Schema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
        type: String,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true
    },
    password: {
        type: String
    },
    otp: {
        type: {
            code: {
                type: String
            },
            expires: {
                type: Date
            }
        },
        default: {
            code: 0,
            expires: 0,
        }
    },
    invoices: {
        type: [],
        default: []
    },
    discount: {
        type: Number,
        default: 0
    },
    birthdate: {
        type: Date,
    },
    roles: {
        type: [String],
        default: ["USER"]
    },
    adminRole: {
        type: mongoose.Types.ObjectId,
        ref: 'role',
        default: null
    },
    token: {
        type: String,
        default: ''
    },
    courses: {
        type: [mongoose.Types.ObjectId],
        ref: "course",
        default: []
    },
    products: {
        type: [mongoose.Types.ObjectId],
        ref: "products",
        default: []
    },
    basket: {type: basketSchema}
}, {
    timestamps: true
});

/** define search text index */
Schema.index({first_name: "text", last_name: "text", username: "text", phone: "text", email: "text"});

/**
 * create mongoose model from the schema
 */
const userModel = mongoose.model("user", Schema);

/** export schema */
module.exports = {
    userModel
}