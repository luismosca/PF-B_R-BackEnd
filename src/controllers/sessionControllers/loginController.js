const bcrypt = require('bcrypt');
const { User } = require('../../db');

const loginController = async (userData) => {
  try {
    console.log(userData);
    const user = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      throw Error('Usuario no encontrado');
    }
    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!passwordMatch) {
      throw Error('Password incorrecta');
    }
    return { message: 'Authenticación satisfactoria', user: user };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  loginController,
};
