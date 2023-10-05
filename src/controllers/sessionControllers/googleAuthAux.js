const { User } = require('../../db');
const {
  emailController,
} = require('../../controllers/sessionControllers/emailController');
const jwt = require('jsonwebtoken');

const googleAuthDal = {
  registerWithGoogle: async (oauthUser) => {
    const isUserExists = await User.findOne({
      where: {
        googleId: oauthUser.id,
      },
    });
    if (isUserExists) {
      const failure = {
        message: 'Usuario ya registrado.',
      };
      return { failure };
    }

    const token = jwt.sign({ email: oauthUser.emails[0].value }, 'secret', {
      expiresIn: '7d',
    });
    const user = new User({
      googleId: oauthUser.id,
      name_surName: oauthUser.displayName,
      // provider: oauthUser.provider,
      email: oauthUser.emails[0].value, //optional - storing it as extra info
      image: oauthUser.photos[0].value, //optional
      token: token,
    });
    await user.save();
    emailController(oauthUser.emails[0].value);
    const success = {
      message: 'Usuario Registrado.',
    };
    return { success, email: user.email };
  },
};

module.exports = googleAuthDal;
