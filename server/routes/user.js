const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");

router.post("/", (req, res) => {
  // USER SIGNUP
  const { username, password, email } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log(`User.js error: ${err}`);
    } else if (user) {
      res.json({
        error: `Sorry, this username is already taken: ${username}`
      });
    } else {
      const newUser = new User({
        username: username,
        password: password,
        email: email
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

// USER LOGIN
router.post(
  "/login",
  function(req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body)
    next();
  },
  passport.authenticate("local"),
  (req, res, next) => {
    console.log("logged in", req.user);
    res.send(req.user);
  }
)

router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
      res.json({ user: req.user })
  } else {
      res.json({ user: null })
  }
})

router.post("/logout", (req, res) => {
  console.log(req.user)
  if (req.user) {
    req.logout();
    req.session.destroy();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
