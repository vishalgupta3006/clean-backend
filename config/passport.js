const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const verifyPassword = require('../utils/passwordUtil').verifyPassword;
const customFields = {
  usernameField: 'EmailAddress',
  passwordField: 'password'
}
const verifyCallback = (username, password, done) => {
  User.findOne({ EmailAddress: username })
    .then(user => {
      if (!user) return done(null, false, { messsage: "The email is not registered" });
      const isValid = verifyPassword(password, user.password.hash, user.password.salt);
      if (isValid) {
        return done(null, user, { messsage: "Login Successful" });
      } else {
        return done(null, false, { messsage: "Password Incorrect" })
      }
    })
    .catch(err => done(err))
}
const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
  .catch(err => done(err));
})
