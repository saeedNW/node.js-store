/** import models */
const {chatModel} = require("app/models");
/** import helper functions */
const {copyObject} = require("app/utils/functions");
/** import socket error handler */
const {socketErrorHandler} = require("app/socket.io/utils/error.handler");

async function getNewMessage(io, socket) {
    /**
     * listen for socket new message event
     * @param {object} data - received message data
     */
    socket.on("newMessage", async data => {
        try {
            /** extract data from message object */
            const {message, roomName, endpoint, sender} = copyObject(data);

            /**
             * update chat data in database.
             * add the new message to chat data
             */
            await chatModel.updateOne({endpoint, "rooms.name": roomName}, {
                '$push': {
                    "rooms.$.messages": {
                        sender,
                        message,
                        dateTime: Date.now()
                    }
                }
            });

            /** send the newly received message to all users in the same room */
            io.of(`/${endpoint}`).in(roomName).emit("confirmMessage", data);
        } catch (err) {
            /** socket error handler function call */
            socketErrorHandler(socket, err);
        }
    });


}

module.exports = {
    getNewMessage
}