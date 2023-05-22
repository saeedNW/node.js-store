/** import mongoose module */
const {default: mongoose} = require("mongoose");

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
    courses: {
        type: [mongoose.Types.ObjectId],
        ref: "course",
        default: []
    },
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