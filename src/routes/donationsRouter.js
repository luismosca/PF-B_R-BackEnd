const { Router } = require("express");

const donationsRouter = Router();

donationsRouter.get("/");

module.exports = donationsRouter;