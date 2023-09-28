const { Router } = require('express');
const {
  getUserByIdHandler,
  getAllUsersHandler,
} = require('../handlers/usersHandlers');

const userRouter = Router();

userRouter.get('/', getAllUsersHandler);
userRouter.get('/:id', getUserByIdHandler);

module.exports = userRouter;
