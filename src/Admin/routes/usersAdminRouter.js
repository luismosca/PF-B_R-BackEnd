const { Router } = require("express");
const verifyIsAdmin = require("../../Middlewares/adminRoutesMiddleware");
const { getAllUsersAdminHandler, updateUsersAdminHandler } = require("../handlers/UsersHandlerAdmin");
const usersAdminRouter = Router();

usersAdminRouter.get("/", verifyIsAdmin, getAllUsersAdminHandler);
usersAdminRouter.put("/:id", verifyIsAdmin, updateUsersAdminHandler);

module.exports = usersAdminRouter;