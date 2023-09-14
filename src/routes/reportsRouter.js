const { Router } = require("express");
const { getReportsHandler, getReportByIdHandler } = require("../handlers/reportsHandler");

const reportsRouter = Router();

reportsRouter.get("/", getReportsHandler); // general y name
reportsRouter.get("/:id", getReportByIdHandler); // para searchBar
reportsRouter.post("/"); // para publicar


module.exports = reportsRouter;