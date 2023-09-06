const mongoose = require("mongoose");

const userDetailsSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const UserDetailsSchema = mongoose.model("userDetails", userDetailsSchema);
module.exports = UserDetailsSchema;
