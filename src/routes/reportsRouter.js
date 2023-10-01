const { Router } = require("express");
const {
  getReportsHandler,
  getReportByIdHandler,
  postReportHandler,
} = require("../handlers/reportsHandler");
const { verifyToken } = require("../controllers/Auth/authVerifyToken");

const reportsRouter = Router();

reportsRouter.get("/", getReportsHandler); // general y name
reportsRouter.get("/:id", getReportByIdHandler); // para searchBar
reportsRouter.post("/", verifyToken, postReportHandler); // para publicar

module.exports = reportsRouter;
