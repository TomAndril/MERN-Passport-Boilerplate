const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../database/models/user");

passport.serializeUser((user, done) => {
  console.log("*** serializeUser called, user: ");
  console.log(user); // the whole raw user object!
  console.log("---------");
  done(null, user._id);
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log(id)
  console.log("DeserializeUser called");
  User.findOne({ _id: id }, (err, user) => {
    console.log("*** Deserialize user, user:");
    console.log(user);
    console.log("--------------");
    done(null, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;
