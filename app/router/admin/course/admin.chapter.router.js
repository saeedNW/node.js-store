/** define admin chapters router */
const adminChapterRouter = require("express").Router();
/** import admin chapter controller */
const {AdminChapterController} = require("app/http/controllers/admin/course/admin.chapter.controller");

adminChapterRouter.put("/new", AdminChapterController.newChapter);

adminChapterRouter.get("/list/:courseId", AdminChapterController.chapterOfCourse);

adminChapterRouter.get("/single/:chapterId", AdminChapterController.singleChapter);

adminChapterRouter.delete("/remove/:chapterId", AdminChapterController.removeChapterById);

adminChapterRouter.patch("/update/:chapterId", AdminChapterController.updateChapterById);

module.exports = {
    adminChapterRouter
}