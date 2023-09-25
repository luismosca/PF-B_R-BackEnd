const { Router } = require("express");
const { postCommentsHandler, getCommentsHandler } = require("../handlers/CommentsHandler");

const commentsRouter = Router();

commentsRouter.post("/", postCommentsHandler);
commentsRouter.get("/", getCommentsHandler);

module.exports = commentsRouter;