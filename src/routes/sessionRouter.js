const { Router } = require("express");
const sessionRouter = Router();

const {
  registerHandler,
} = require("../handlers/sessionHandlers/registerHandler.js");
const { loginHandler } = require("../handlers/sessionHandlers/loginHandler.js");
const { postTokenHandler } = require("../handlers/sessionHandlers/postTokenHandler.js");

sessionRouter.post("/login", loginHandler); ///login
sessionRouter.post("/login/token", postTokenHandler);
sessionRouter.post("/register", registerHandler); //register

module.exports = sessionRouter;
