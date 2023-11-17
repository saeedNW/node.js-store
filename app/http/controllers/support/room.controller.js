/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import http status codes module */
const httpStatus = require("http-status-codes");
/** import http-error module */
const createHttpError = require("http-errors");
/** import chat model */
const {chatModel} = require("app/models");
/** import helper functions */
const {copyObject} = require("app/utils/functions");
/** import path module */
const path = require('path');

/**
 * conversations rooms class controller
 */
class RoomController extends Controller {
    /**
     * add new chat room process
     * @param {object} req - express request object
     * @param {object} res - express response object
     * @param next express next function
     * @returns {Promise<void>}
     */
    async addChatRoom(req, res, next) {
        try {
            /** extract data from request body */
            const {name, description, fileName, fileUploadPath, namespace} = req.body;

            /** check for conversation existence */
            await this.findConversationWithEndpoint(namespace);
            /** check for duplicated room name */
            await this.findRoomWithName(name);

            /**
             * create image path
             * @type {string}
             */
            const image = path.join(fileUploadPath, fileName);

            /**
             * create room data
             * @type {{image: string, name: *, description: *}}
             */
            const room = {name, description, image}

            /** add new room to the chat data in database */
            await chatModel.updateOne({endpoint: namespace}, {
                $push: {rooms: room}
            });

            /** send success message */
            return this.sendSuccessResponse(req, res, httpStatus.CREATED, "اتاق با موفقیت ایجاد شد");
        } catch (err) {
            next(err);
        }
    }

    /**
     * retrieve chat rooms list
     * @param {object} req - express request object
     * @param {object} res - express response object
     * @param next express next function
     * @returns {Promise<void>}
     */
    async retrieveChatRooms(req, res, next) {
        try {
            /** retrieve conversations from database */
            const conversations = await chatModel.find({}, {'rooms': 1});

            /** return success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {conversations});
        } catch (err) {
            next(err);
        }
    }

    /**
     * check for room existence using its name
     * @param {string} name - chat room name
     * @returns {Promise<boolean>}
     */
    async findRoomWithName(name) {
        /** check for room existence in database */
        const conversation = await chatModel.exists({"rooms.name": name});
        /** throw error if room was found */
        if (conversation) throw new createHttpError.BadRequest("این اسم قبلا انتخاب شده است")
        /** return true if the room was not found */
        return true;
    }

    /**
     * check for conversation existence using its endpoint
     * @param {string} endpoint - namespace endpoint
     * @returns {Promise<boolean>}
     */
    async findConversationWithEndpoint(endpoint) {
        /** check for conversation existence in database */
        const conversation = await chatModel.findOne({endpoint});
        /** throw error if conversation was not found */
        if (!conversation) throw new createHttpError.NotFound("فضای مگالمه ای یافت نشد")
        /** return founded conversation */
        return copyObject(conversation);
    }
}

module.exports = {
    RoomController: new RoomController()
}