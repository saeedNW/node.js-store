/** import sockets error handler */
const {socketErrorHandler} = require("app/socket.io/utils/error.handler");

/**
 * process of user joining a room
 * @param {object} io - socket main io data object
 * @param {object} socket - socket connection data object
 * @param {string} roomName - room name
 * @param {string} endpoint - namespace endpoint
 * @param {[*]} rooms - list of the namespace rooms
 * @returns {Promise<void>}
 */
async function roomJoinResolver(io, socket, roomName, endpoint, rooms) {
    try {
        /** make the socket to leave all the previous rooms */
        await leaveAllRoomsResolver(io, socket, endpoint);

        /** join the socket to the new chosen room */
        socket.join(roomName);

        /** calculate the new count of the current room's online users */
        await getCountOfOnlineUsers(io, `/${endpoint}`, roomName);

        /** get the current room info */
        const roomInfo = rooms.find(item => item.name === roomName);

        /** send the current room's info over `roomInfo` event */
        socket.emit("roomInfo", roomInfo);

        /** listen for socket `disconnect` event */
        socket.on("disconnect", async () => {
            /** calculate the new count of the room's online users */
            await getCountOfOnlineUsers(io, `/${endpoint}`, roomName);
        });
    } catch (err) {
        /** socket error handler function call */
        socketErrorHandler(socket, err);
    }
}

/**
 * leaves all rooms that the given socket is currently connected to
 * @param {object} io - socket main io data object
 * @param {object} socket - socket connection data object
 * @param endpoint
 */
async function leaveAllRoomsResolver(io, socket, endpoint) {
    /**
     * get the list of existing namespaces in system socket service.
     */
    const socketNamespaces = io.sockets.server._nsps;

    /** loop over namespaces data */
    for (const [key, namespace] of socketNamespaces.entries()) {
        /** get the list of the rooms that the socket is a member of */
        const socketRooms = namespace.adapter.sids.get(socket.id);

        /** proceed if the room exists */
        if (socketRooms) {
            /** loop over rooms */
            for (const room of socketRooms.entries()) {

                /** leave the current room */
                socket.leave(room[0]);

                /** calculate the new count of the room's online users */
                await getCountOfOnlineUsers(io, namespace.name, room[0]);
            }
        }
    }
}

/**
 * retrieve and emit the count of the active users on a certain room in a namespace
 * @param {object} io - socket main io data object
 * @param {string} endpoint - namespace endpoint
 * @param {string} roomName - name of the chosen room
 * @returns {Promise<void>}
 */
async function getCountOfOnlineUsers(io, endpoint, roomName) {
    /**
     * get the data of the online sockets on the chosen room
     * @type {Set<SocketId>}
     */
    const onlineUsers = await io.of(endpoint).in(roomName).allSockets();

    /** send the count of the online sockets in the chosen room socket */
    io.of(endpoint).in(roomName).emit("countOfOnlineUsers", Array.from(onlineUsers).length);
}

module.exports = {
    roomJoinResolver,
}