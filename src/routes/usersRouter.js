const { Router } = require('express');
const {
  postUser,
  putUser,
  getUserByEmail,
  getAllUsers,
} = require('../controllers/userController.js');

const userRouter = Router();

userRouter.get('/', getAllUsers);

// get all users from db and return them as json array of objects (users)
userRouter.route('/').put(putUser);

userRouter.post('/', postUser);

// get a single user by email address
userRouter.route('/:email').get((req, res) => {
  getUserByEmail(res, req.params.email);
});

//userRouter.get('/:email', login, getUserByEmail);

module.exports = userRouter;
