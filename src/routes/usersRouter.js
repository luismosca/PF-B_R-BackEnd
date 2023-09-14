const { Router } = require('express');
const { getAllUsers } = require('../controllers/userController/userController');

const userRouter = Router();

userRouter.get('/', getAllUsers);

// userRouter.route('/').put(putUser);

module.exports = userRouter;
