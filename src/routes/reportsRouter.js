const { Router } = require("express");
const {
  getReportsHandler,
  getReportByIdHandler,
  postReportHandler,
  getUserReportsHandler,
} = require("../handlers/reportsHandler");
const { verifyToken } = require("../controllers/Auth/authVerifyToken");

const reportsRouter = Router();

reportsRouter.get("/", getReportsHandler); // general y name
reportsRouter.get("/:id", getReportByIdHandler); // para searchBar
reportsRouter.post("/", verifyToken, postReportHandler); // para publicar
reportsRouter.post("/user/", getUserReportsHandler);

module.exports = reportsRouter;
