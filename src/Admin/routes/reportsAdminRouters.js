const { Router } = require("express");
const verifyIsAdmin = require("../../Middlewares/adminRoutesMiddleware");
const { getAllReportsAdminHandler, updateReportsAdminHandler } = require("../handlers/ReportsHandlerAdmin");
const reportsAdminRouter = Router();

reportsAdminRouter.get("/", verifyIsAdmin, getAllReportsAdminHandler);
reportsAdminRouter.put("/:id", verifyIsAdmin, updateReportsAdminHandler);

module.exports = reportsAdminRouter;