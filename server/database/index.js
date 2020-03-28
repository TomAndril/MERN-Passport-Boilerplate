const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const uri = "mongodb://localhost:27017/newcrud";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log("Connected to MongoDB");
  },
  err => {
    console.log("Error connecting to MongoDB");
    console.log(err);
  }
);

module.exports = mongoose.connection;
