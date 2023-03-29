/** define admin course router */
const adminChapterRouter = require("express").Router();
/** import admin chapter controller */
const {AdminChapterController} = require("app/http/controllers/admin/course/admin.chapter.controller");

adminChapterRouter.put("/new", AdminChapterController.newChapter);

module.exports = {
    adminChapterRouter
}