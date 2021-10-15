const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../model/User');

module.exports = function(passport){
  passport.use(
    new LocalStrategy({usernameField: 'EmailAddress'}, (EmailAddress, password, done) => {
      //Match User
      console.log("Hererererer")
      User.findOne({EmailAddress: EmailAddress})
      .then(user => {
        if(!user)
        return done(null, false, {messsage: "The email is not registered"});
        return done(null, user);
        //Match Password
        // bcrypt.compare(password, user.password, (err, isMatch) => {
        //   if(err) throw err;
        //   if(isMatch){
        //     return done(null, user);
        //   } else {
        //     return done(null, false, {messsage: "password incorrect"});
        //   }
        // })
      })
      .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  });
}