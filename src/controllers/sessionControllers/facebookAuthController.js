const express = require("express");
const router = express();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env;
const { User } = require("../../db");

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3001/auth/facebook/callback", // Cambia esto a tu URL de redireccionamiento
    },
    async (accessToken, refreshToken, profile, done) => {
      // Aquí puedes verificar si el usuario ya existe en tu base de datos o crear uno nuevo.
      // Luego, llama a done() para completar la autenticación.
      try {
        const user = await User.findOne({ facebookId: profile.id });
        if (user) {
          console.log("Facebook User already exist in DB..");
          return done(null, user);
        } else {
          console.log("Adding new facebook user to DB..");
          const newUser = new User({
            name_surName: profile.displayName,
            email: profile.emails[0].value,
            facebookId: profile.id,
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get("/", passport.authenticate("facebook", { scope: "email" }));

router.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/facebook/error",
  }),
  (req, res) => {
    // Successful authentication, redirect to success screen.
    res.redirect("/auth/facebook/success");
  }
);

router.get("/success", async (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.displayName,
    provider: req.session.passport.user.provider,
  };
  res.render("fb-success", { user: userInfo });
});

router.get("/error", (req, res) => res.send("Error logging in via Facebook.."));

router.get("/signout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log("session destroyed.");
    });
    res.render("auth");
  } catch (err) {
    res.status(400).send({ message: "Failed to sign out fb user" });
  }
});

module.exports = router;
