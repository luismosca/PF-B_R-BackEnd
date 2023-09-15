const { Router } = require('express');
const { getAllUsers } = require('../controllers/userController/userController');
const { getUserByIdHandler } = require('../handlers/usersHandlers');

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserByIdHandler);

module.exports = userRouter;
