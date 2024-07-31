import NoticeSchema from "../utils/notice";

var mongoose = require("mongoose");

var schema: NoticeSchema = new mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
  userId: {
    type: String,
    required: true,
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
