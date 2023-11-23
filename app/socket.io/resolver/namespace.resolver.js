/** import socket error handler */
const {socketErrorHandler} = require("app/socket.io/utils/error.handler");
/** import models */
const {chatModel} = require("app/models");
/** import room resolver */
const {roomJoinResolver} = require("./room.resolver");
const createHttpError = require("http-errors");

/**
 * socket namespaces list resolver
 * @param {object} socket - socket object data
 */
async function namespacesListResolver(socket) {
    try {
        /** retrieve namespaces from database */
        const namespaces = await chatModel.find({}, {
            'title': 1,
            'endpoint': 1,
            'room': 1,
        }).sort({'_id': -1});

        /** emit namespaces on the socket connection */
        socket.emit('namespacesList', namespaces);
    } catch (err) {
        /** socket error handler function call */
        socketErrorHandler(socket, err);
    }
}

/**
 * socket namespace connection resolver
 * @param {object} io - socket main io data object
 * @param {object} socket - socket object data
 * @param {string} endpoint - conversation connection endpoint
 * @returns {Promise<void>}
 */
async function namespacesConnectionResolver(io, socket, endpoint) {
    try {
        /** retrieve namespaces from database */
        let conversation = await chatModel.findOne({endpoint}, {
            'title': 1,
            'endpoint': 1,
            'rooms': 1,
        });

        /** send conversation rooms list to socket */
        socket.emit("roomList", conversation.rooms);

        /** listen for `room join` event on the chosen namespace */
        socket.on("joinRoom", async roomName => {
            /** proceed with the room joining process */
            await roomJoinResolver(io, socket, roomName, conversation.endpoint, conversation.rooms);
        });
    } catch (err) {
        /** socket error handler function call */
        socketErrorHandler(socket, err);
    }
}

module.exports = {
    namespacesListResolver,
    namespacesConnectionResolver,
}