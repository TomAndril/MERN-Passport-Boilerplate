const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../database/models/user");

passport.serializeUser((user, done) => {
  console.log('Serializing User')
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    console.log('Deserializing User');
    done(null, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;
