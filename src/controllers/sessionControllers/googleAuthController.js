const express = require("express");
const session = require("express-session");
const router = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();
const { GOOGLE_APP_ID, GOOGLE_APP_SECRET } = process.env;
const googleAuth = require("./googleAuthAux");
const jwt = require("jsonwebtoken")
const { User } = require('../../db');
const { Op } = require('sequelize');

router.use(session({
  secret: GOOGLE_APP_SECRET, // Cambia esto a una cadena segura
  resave: false,
  saveUninitialized: true,
  // Configuración adicional si es necesario
}));

let userProfile;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_APP_ID,
      clientSecret: GOOGLE_APP_SECRET,
      callbackURL: "/auth/google/callback", // Cambia esto a tu URL de redireccionamiento
    },
    (accessToken, refreshToken, profile, done) => {
      // Aquí puedes verificar si el usuario ya existe en tu base de datos o crear uno nuevo.
      // Luego, llama a done() para completar la autenticación.
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// request at /auth/google, when user click sign-up with google button transferring
// the request to google server, to show emails screen
router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

// URL Must be same as 'Authorized redirect URIs' field of OAuth client, i.e: /auth/google/callback
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/error" }),
  (req, res) => {
    res.redirect("/auth/google/success"); // Successful authentication, redirect success.
  }
);

router.get("/success", async (req, res) => {
  const { failure, success, email } = await googleAuth.registerWithGoogle(userProfile);
  if (failure) console.log("Google user already exist in DB..");
  else console.log("Registering new Google user..");
  console.log(userProfile);
  try {
    let emailToken = userProfile.emails[0].value;
    console.log(emailToken);
    const token = jwt.sign({ email: emailToken }, "secret", { expiresIn: '7d' });
    res.redirect(`http://localhost:5173/home?token=${token}`)
  } catch (error) {
    res.status(500).json({error: error.message})    
  }
});

router.get("/error", (req, res) => res.send("Error logging in via Google.."));

router.get("/signout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log("session destroyed.");
    });
    res.render("auth");
  } catch (err) {
    res.status(400).send({ message: "Failed to sign out user" });
  }
});

module.exports = router;
