/** import socket module */
const socketIO = require("socket.io");
/** import socket namespace handler */
const NamespaceHandler = require('./handler/namespace.handler');

/**
 * socketIO server initializer
 * @param {object} httpServer - http server
 * @returns {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} - socketIO server
 */
function initialSocket(httpServer) {
    /**
     * create socket io server
     */
    const io = new socketIO.Server(httpServer, {
        cors: {
            origin: "*"
        },
        maxHttpBufferSize: 1e8
    });

    /** initialize socket handler */
    socketHandler(io);

    /** return socket server */
    return io;
}

/**
 * sockets handler function
 * @param {object} io - socketIO server object
 */
function socketHandler(io) {
    /** initialize socket namespace handler */
    new NamespaceHandler(io);
}

module.exports = {initialSocket}