/** import express module */
const express = require('express');
/** create express Router instance */
const roomRouter = express.Router();
/** import controller */
const {RoomController} = require('app/http/controllers/support/room.controller');
/** import file uploader */
const {uploadFile} = require("app/utils/multer");

/** new name space process route */
roomRouter.post('/add', uploadFile.single('image'), RoomController.addChatRoom);

/** rooms retrieve process route */
roomRouter.get('/list', RoomController.retrieveChatRooms);

module.exports = {roomRouter};