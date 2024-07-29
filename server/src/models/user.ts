import UserSchema from "../utils/user";

var mongoose = require("mongoose");

var schema: UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

var user = new mongoose.model("User", schema);

module.exports = user;
