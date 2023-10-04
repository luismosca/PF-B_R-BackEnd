const { User } = require("../../db");
const { emailController } = require("../../controllers/sessionControllers/emailController")

const googleAuthDal = {
  registerWithGoogle: async (oauthUser) => {
    const isUserExists = await User.findOne({where: {
      googleId: oauthUser.id,
    }});
    if (isUserExists) {
      const failure = {
        message: "User already Registered.",
      };
      return { failure };
    }

    const user = new User({
      googleId: oauthUser.id,
      name_surName: oauthUser.displayName,
      // provider: oauthUser.provider,
      email: oauthUser.emails[0].value, //optional - storing it as extra info
      image: oauthUser.photos[0].value, //optional
    });
    await user.save();
    emailController(oauthUser.emails[0].value);
    const success = {
      message: "User Registered.",
    };
    return { success, email: user.email };
  },
};

module.exports = googleAuthDal;
