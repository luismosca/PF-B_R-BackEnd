const bcrypt = require('bcrypt');
const {
  registerController,
} = require('../../controllers/sessionControllers/registerController');
const {
  emailController,
} = require('../../controllers/sessionControllers/emailController');
const jwt = require('jsonwebtoken');

const registerHandler = async (req, res) => {
  try {
    const { name_surName, email, password, image, token } = req.body;

    if (!name_surName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const tokenNew = jwt.sign({ email: email.email }, 'secret', {
      expiresIn: '7d',
    });

    const userData = {
      name_surName,
      email,
      password: hashedPassword,
      image,
      role: 'user',
      token: tokenNew,
    };

    const newUser = await registerController(userData);

    const responseUser = {
      name: newUser.name_surName,
      email: newUser.email,
    };

    emailController(newUser.email);
    return res.status(201).json(responseUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  registerHandler,
};
