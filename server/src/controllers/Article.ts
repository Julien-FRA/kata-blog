const ArticleModel = require("../models/article");

// Création et sauvegarde d'un article
exports.create = async (req, res) => {
  if (!req.body.author && !req.body.topic && !req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const article = new ArticleModel({
    author: req.body.author,
    date: new Date(),
    topic: req.body.topic,
    content: req.body.content,
  });

  await article
    .save()
    .then((data) => {
      res.send({
        message: "Article created successfully!!",
        article: data,
      });
    })
    .catch((err) => {
      res.send({
        message: err.message || "Some error occured while creating artcile",
      });
    });
};

// Récupérer tous les articles de la database
exports.findAll = async (req, res) => {
  try {
    const article = await ArticleModel.find();
    res.status(200).json(article);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Récupérer un article avec son id
exports.findOne = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Mise à jour d'un article avec son id
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await ArticleModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Article not found",
        });
      } else {
        res.send({ message: "Article updated successfully!!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Supprimer un article avec un id
exports.destroy = async (req, res) => {
  const id = req.params.id;

  await ArticleModel.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Article not found",
        });
      } else {
        res.send({
          message: "Article deleted successfully!!",
        });
      }
    })
    .catch((err) => {
      res.satus(500).send({
        message: err.message,
      });
    });
};
