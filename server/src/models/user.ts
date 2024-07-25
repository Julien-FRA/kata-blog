import UserSchema from "../interfaces/user";

var mongoose = require("mongoose");

var schema: UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  phone: String,
});

var user = new mongoose.model("User", schema);

module.exports = user;
