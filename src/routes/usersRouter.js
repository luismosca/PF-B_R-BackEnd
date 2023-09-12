const { Router } = require("express");

const userRouter = Router();

userRouter.get("/");

module.exports = userRouter;