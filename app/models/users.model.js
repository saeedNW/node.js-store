/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define blogs schema
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
            expiresIn: {
                type: Date
            }
        },
        default: {
            code: 0,
            expire: 0,
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
        default: ["USERS"]
    }
}, {
    timestamps: true
});

/**
 * create mongoose model from the schema
 */
const userModel = mongoose.model("user", Schema);

/** export schema */
module.exports = {
    userModel
}