import NoticeSchema from "../utils/notice";

var mongoose = require("mongoose");

var schema: NoticeSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
  },
  articleId: {
    type: String,
    ref: "Article",
  },
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

var notice = new mongoose.model("Notice", schema);

module.exports = notice;
