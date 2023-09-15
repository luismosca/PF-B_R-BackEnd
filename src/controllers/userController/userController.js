const { User } = require('../../db');
const { Op } = require('sequelize');

async function getAllUsers() {
  try {
    const usersDb = await User.findAll();
    if (!usersDb.length) {
      return null;
    }
    return usersDb;
  } catch (error) {
    throw error;
  }
}

async function getUserByName(name) {
  try {
    const user = await User.findAll({
      include: [
        {
          model: User,
          attibutes: ['name'],
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        },
      ],
      limit: 15,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

const getUserById = async (id) => {
  try {
    const user = await Report.findByPk(id);
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserByName,
  getUserById,
};
