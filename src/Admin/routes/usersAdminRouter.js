const { Router } = require("express");
const verifyIsAdmin = require("../../Middlewares/adminRoutesMiddleware");
const { getAllUsersAdminHandler, updateUsersAdminHandler } = require("../handlers/UsersHandlerAdmin");
const usersAdminRouter = Router();

usersAdminRouter.get("/", getAllUsersAdminHandler);
usersAdminRouter.put("/:id", updateUsersAdminHandler);

module.exports = usersAdminRouter;