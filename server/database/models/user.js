const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

userSchema.methods = {
  checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
  hashPassword: inputPassword => {
    return bcrypt.hashSync(inputPassword);
  }
};

userSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("NO PASSWORD PROVIDED");
    next();
  } else {
    console.log("PREPARING TO HASH PASSWORD");
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model("users", userSchema);
module.exports = User;
