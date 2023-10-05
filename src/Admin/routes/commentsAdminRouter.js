const { Router } = require("express");
const { getAllCommentsHandler, updateCommentsHandler } = require("../handlers/CommentsHandlerAdmin");
const verifyIsAdmin = require("../../Middlewares/adminRoutesMiddleware");
const commentsAdminRouter = Router();

commentsAdminRouter.get("/", verifyIsAdmin, getAllCommentsHandler);
commentsAdminRouter.put("/:id", updateCommentsHandler);

module.exports = commentsAdminRouter;