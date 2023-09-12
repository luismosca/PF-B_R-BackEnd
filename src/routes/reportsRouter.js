const { Router } = require("express");

const reportsRouter = Router();

reportsRouter.get("/"); // general y name
reportsRouter.get("/:id"); // para searchBar
reportsRouter.post("/"); // para publicar


module.exports = reportsRouter;