const { Router } = require('express');
const {
  putUser,
  getUserByEmail,
  getAllUsers,
} = require('../controllers/userController.js');

const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.route('/').put(putUser);

userRouter.route('/:email').get((req, res) => {
  getUserByEmail(res, req.params.email);
});

//userRouter.get('/:email', login, getUserByEmail);

module.exports = userRouter;
