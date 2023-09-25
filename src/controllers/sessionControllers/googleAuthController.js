const express = require("express");
const session = require("express-session");
const router = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();
const { GOOGLE_APP_ID, GOOGLE_APP_SECRET } = process.env;
const { User } = require("../../db");
const googleAuth = require("./googleAuthAux");

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
      // User.findOne({where: { googleId: profile.id }}, (err, user) => {
      //   if (err) return done(err);
      //   if (user) {
      //     console.log("Google User already exist in DB..");
      //     return done(null, user);
      //   } else {
      //     console.log("Adding new google user to DB..");
      //     const newUser = new User({
      //       googleId: profile.id,
      //       name_surName: profile.displayName,
      //       email: profile.emails[0].value,
      //     });
      //     newUser.save((err, user) => {
      //       if (err) return done(err);
      //       return done(null, user);
      //     });
      //   }
      // });
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
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// URL Must be same as 'Authorized redirect URIs' field of OAuth client, i.e: /auth/google/callback
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/error" }),
  (req, res) => {
    res.redirect("/auth/google/success"); // Successful authentication, redirect success.
  }
);

router.get("/success", async (req, res) => {
  const { failure, success } = await googleAuth.registerWithGoogle(userProfile);
  if (failure) console.log("Google user already exist in DB..");
  else console.log("Registering new Google user..");
  res.render("success", { user: userProfile  });
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

router.set('view engine', 'ejs');

module.exports = router;
