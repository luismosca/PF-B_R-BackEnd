const { Router } = require("express");
const { getReportsHandler, getReportByIdHandler, postReportHandler } = require("../handlers/reportsHandler");

const reportsRouter = Router();

reportsRouter.get("/", getReportsHandler); // general y name
reportsRouter.get("/:id", getReportByIdHandler); // para searchBar
reportsRouter.post("/", postReportHandler); // para publicar


module.exports = reportsRouter;