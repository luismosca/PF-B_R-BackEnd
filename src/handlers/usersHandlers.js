const {
  getAllUsers,
  getUserByName,
  getUserById,
} = require('../controllers/userController/userController');

const getAllUsersHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const userByName = await getUserByName(name);
      userByName
        ? res.status(201).json({ userByName })
        : res.status(400).send('User not found');
    } else {
      const allUsers = await getAllUsers();
      allUsers
        ? res.status(200).json(allUsers)
        : res.status(400).send({ message: 'Error finding users' });
    }
  } catch (error) {
    return res.status(500).send({ error: `Error found: ${error}` });
  }
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    user
      ? res.status(200).json(user)
      : res.status(400).send({ error: `Not found user with id: ${id}` });
  } catch (error) {
    return res.status(500).send({ error: `Error found user with id: ${id}` });
  }
};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
};
