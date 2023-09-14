const { User } = require('../db');
const { Op } = require('sequelize');

async function getAllUsers(req, res) {
  try {
    const usersDb = await User.findAll();
    res.status(200).send(usersDb);
  } catch (error) {
    res.status(400).send('Users not Found');
  }
}

const postUser = async (req, res) => {
  try {
    const user = req.body;
    await User.create(user);

    res.json('New User created');
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const putUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no found.' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Un error al actualizar el usuario.' });
  }
};

const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return res.json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  getAllUsers,
  postUser,
  putUser,
  getUserByEmail,
};
