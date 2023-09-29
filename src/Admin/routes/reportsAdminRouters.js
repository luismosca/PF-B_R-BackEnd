const { Router } = require("express");
const verifyIsAdmin = require("../../Middlewares/adminRoutesMiddleware");
const { getAllReportsAdminHandler, updateReportsAdminHandler } = require("../handlers/ReportsHandlerAdmin");
const reportsAdminRouter = Router();

reportsAdminRouter.get("/", getAllReportsAdminHandler);
reportsAdminRouter.put("/:id", updateReportsAdminHandler);

module.exports = reportsAdminRouter;