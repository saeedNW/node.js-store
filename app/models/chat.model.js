/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define message schema
 */
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    message: {
        type: String
    },
    dateTime: {
        type: Number
    }
});

/**
 * define chat room schema
 */
const roomSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    messages: {
        type: [messageSchema],
        default: []
    },
});

/**
 * define chat schema
 */
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    endpoint: {
        type: String,
        required: true
    },
    rooms: {
        type: [roomSchema],
        default: []
    }
}, {
    timestamps: true
});

/**
 * create mongoose model from the schema
 */
const chatModel = mongoose.model("chat", Schema);

/** export schema */
module.exports = {
    chatModel
}