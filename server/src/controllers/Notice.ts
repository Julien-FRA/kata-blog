const NoticeModel = require("../models/notice");
const ArticlesModel = require("../models/article");
const UsersModel = require("../models/user");

// Création d'un commentaire sur un article
exports.create = async (req, res) => {
  if (!req.body.description) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const userId = req.user.userId;

  const user = await UsersModel.findById(userId);

  if (!user) {
    return res.status(404).send({ message: "User not found..." });
  }

  const articleId = req.params.id;

  const article = await ArticlesModel.findById(articleId);

  if (!article) {
    return res.status(404).send({ message: "Article not found..." });
  }

  const notice = new NoticeModel({
    userId: userId,
    articleId: articleId,
    userName: user.name,
    date: new Date(),
    description: req.body.description,
  });

  await notice
    .save()
    .then((data) => {
      res.send({
        message: "Notice created successfully!!",
        article: data,
      });
    })
    .catch((err) => {
      res.send({
        message: err.message || "Some error occured while creating artcile",
      });
    });

  const updatedArticle = await ArticlesModel.findByIdAndUpdate(
    articleId,
    { $push: { notice: notice } },
    { new: true }
  );
};
