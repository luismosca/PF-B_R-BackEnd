const { User } = require('../../db');
const { Op } = require('sequelize');

async function getAllUsers(req, res) {
  try {
    const usersDb = await User.findAll();
    if (!usersDb.length) {
      return res.status(400).send('Users not Found');
    }
    res.status(200).send(usersDb);
  } catch (error) {
    res.status(400).send('Users not Found');
  }
}

// const putUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedUser) {
//       return res.status(404).json({ error: 'Usuario no found.' });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Un error al actualizar el usuario.' });
//   }
// };

module.exports = {
  getAllUsers,
};
