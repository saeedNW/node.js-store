/** import models */
const {chatModel} = require("app/models");
/** import namespace resolvers */
const {namespacesListResolver, namespacesConnectionResolver} = require("app/socket.io/resolver/namespace.resolver");
/** import message resolver */
const {getNewMessage} = require("app/socket.io/resolver/message.resolver");

/**
 * namespace socket event handler class
 * @class NamespaceHandler
 */
module.exports = class NamespaceHandler {
    /**
     * define a private variable to save socket's `io` object
     * @type {object}
     */
    #io;

    constructor(io) {
        /**
         * set the `io` variable value.
         */
        this.#io = io;

        /** initialize socket connection */
        this.initConnection();
        /** initialize socket namespace connection */
        this.createNamespaceConnection().then();
    }

    /**
     * socket connection handler
     */
    initConnection() {
        /**
         * initialize system socket connection.
         * send support system's namespaces on socket connection.
         */
        this.#io.on('connection', namespacesListResolver);
    }

    /**
     * socket name space connection handler
     */
    async createNamespaceConnection() {
        /** retrieve namespaces from database */
        const conversations = await chatModel.find({}, {'endpoint': 1})
            .sort({'_id': -1});

        /** loop over retrieved namespaces */
        for (const conversation of conversations) {
            /** initialize socket namespaces connection */
            this.#io.of(`/${conversation.endpoint}`).on("connection", async socket => {
                /** initialize namespace connection resolver */
                await namespacesConnectionResolver(this.#io, socket, conversation.endpoint);
                /** initialize message management resolver */
                await getNewMessage(this.#io, socket);
            });
        }
    }
}