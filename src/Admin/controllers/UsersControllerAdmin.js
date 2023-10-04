const { User } = require('../../db');

const getAllUsersAdmin = async () => {
  try {
    const { count, rows } = await User.findAndCountAll();
    if (count > 0) {
      return {
        total: count,
        users: rows,
      };
    }
    return null;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

const updateUserAdmin = async (id, role) => {
  console.log(id, role);
  // roles: "admin", "user" y "banned"
  const userId = id.id; // ya que el id se recibe en un objeto que tiene la propiedad id
  try {
    const user = await User.findByPk(userId);

    if (user) {
      user.role = role;
      await user.save();
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

module.exports = {
  getAllUsersAdmin,
  updateUserAdmin,
};
