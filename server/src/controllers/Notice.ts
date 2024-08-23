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

  const articleId = req.params.articleId;

  const article = await ArticlesModel.findById(articleId);

  console.log(article);

  if (!article) {
    return res.status(404).send({ message: "Article not found..." });
  }

  const notice = new NoticeModel({
    articleId: article._id,
    userId: userId,
    userName: user.name,
    date: new Date(),
    description: req.body.description,
  });

  console.log(notice);

  await notice
    .save()
    .then((data) => {
      res.send({
        message: "Notice created successfully!!",
        notice: data,
      });
    })
    .catch((err) => {
      res.send({
        message: err.message || "Some error occured while creating notice",
      });
    });
};

// Récupérer tous les articles de la database
exports.findAll = async (req, res) => {
  const articleId = req.params.articleId;

  const article = await ArticlesModel.findById(articleId);

  if (!article) {
    return res.status(404).send({ message: "Article not found..." });
  }

  try {
    await NoticeModel.find({ articleId: articleId })
      .populate("article")
      .then((notice) => res.json(notice));
  } catch (error) {
    res.status(404).json({ messsage: error.message });
  }
};

// Récupérer un article avec son id
exports.findOne = async (req, res) => {
  const articleId = req.params.articleId;

  const article = await ArticlesModel.findById(articleId);

  if (!article) {
    return res.status(404).send({ message: "Article not found..." });
  }

  try {
    await NoticeModel.findById(req.params.noticeId)
      .populate("article")
      .then((notice) => res.json(notice));
  } catch (error) {}
};

// Mise à jour de son commentaire
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const noticeId = req.params.noticeId;

  const notice = await NoticeModel.findById(noticeId);

  if (!notice) {
    return res.status(404).send({ message: "Notice not found..." });
  }

  const userNoticeId = notice.userId;

  const currentUserId = req.user.userId;

  if (currentUserId != userNoticeId) {
    return res.status(401).send({ message: "Its not your notice!" });
  }

  await NoticeModel.findByIdAndUpdate(noticeId, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Notice not found",
        });
      } else {
        notice.save();
        res.send({ message: "Notice updated successfully!!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Supprimer un commentaire
exports.destroy = async (req, res) => {
  const currentUserId = req.user.userId;

  const noticeId = req.params.noticeId;

  const notice = await NoticeModel.findById(noticeId);

  if (!notice) {
    return res.status(404).send({ message: "Notice not found..." });
  }

  const userNoticeId = notice.userId;

  if (currentUserId != userNoticeId) {
    return res.status(401).send({ message: "Its not your notice!" });
  }

  await NoticeModel.findByIdAndDelete(noticeId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Notice not found",
        });
      } else {
        res.send({
          message: "Notice deleted successfully!!",
        });
      }
    })
    .catch((err) => {
      res.satus(500).send({
        message: err.message,
      });
    });
};
