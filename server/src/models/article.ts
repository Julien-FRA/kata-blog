import ArticleSchema from "../utils/article";

var mongoose = require("mongoose");

var schema: ArticleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  notice: {
    type: [
      {
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
      },
    ],
    required: false,
  },
});

var article = new mongoose.model("Article", schema);

module.exports = article;
