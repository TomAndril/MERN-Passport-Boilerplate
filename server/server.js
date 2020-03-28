const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const passport = require("./passport");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require('connect-mongo')(session)
const app = express();
const PORT = 8080;

// ROUTE REQUIRES
const user = require("./routes/user");

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cookieParser('casa'))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// SESSION MIDDLEWARE
app.use(
  session({
    secret: "casa",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use("/user", user);

// SERVER START
app.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}`);
});
