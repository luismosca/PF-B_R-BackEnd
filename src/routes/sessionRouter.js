const { Router } = require("express");

const sessionRouter = Router();

sessionRouter.get("/") ///login
sessionRouter.post("/") //register

module.exports = sessionRouter;