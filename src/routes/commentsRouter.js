const { Router } = require("express");
const { postCommentsHandler, getCommentsHandler } = require("../handlers/CommentsHandler");
const { verifyToken } = require("../controllers/Auth/authVerifyToken");

const commentsRouter = Router();

commentsRouter.post("/", verifyToken, postCommentsHandler);
commentsRouter.get("/", getCommentsHandler);
commentsRouter.put("/", );

module.exports = commentsRouter;